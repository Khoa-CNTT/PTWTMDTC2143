import os
import re
import traceback
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, inspect, text

from langchain.prompts import PromptTemplate
from gemini_llm import GeminiLLM

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise Exception("Thiếu DATABASE_URL trong biến môi trường")

engine = create_engine(DATABASE_URL)

def get_schema_str(engine):
    inspector = inspect(engine)
    schema_lines = []
    for table in inspector.get_table_names():
        schema_lines.append(f"- {table}:")
        for col in inspector.get_columns(table):
            schema_lines.append(f"  • {col['name']} ({col['type']})")

        fks = inspector.get_foreign_keys(table)
        for fk in fks:
            col_names = ", ".join(fk["constrained_columns"])
            referred_table = fk["referred_table"]
            referred_cols = ", ".join(fk["referred_columns"])
            schema_lines.append(f"  🔗 FOREIGN KEY ({col_names}) REFERENCES {referred_table}({referred_cols})")

        for other_table in inspector.get_table_names():
            if other_table == table:
                continue
            other_fks = inspector.get_foreign_keys(other_table)
            for fk in other_fks:
                if table == fk["referred_table"]:
                    col_names = ", ".join(fk["constrained_columns"])
                    schema_lines.append(f"  🔗 {other_table} có khóa ngoại tham chiếu đến {table}: ({col_names})")

    return "\n".join(schema_lines)

schema_str = get_schema_str(engine)

def create_sql_prompt(schema_str):
    template = """
Bạn là trợ lý AI chuyển câu hỏi ngôn ngữ tự nhiên sang câu SQL SELECT hợp lệ theo schema sau.

Schema database:
{schema_str}

Hướng dẫn đặc biệt:

- Tất cả thuộc tính như size, color, màu sắc, kích thước... là thuộc tính của biến thể (variant).
- Khi truy vấn variant theo thuộc tính, hãy dùng truy vấn **không phân biệt chữ hoa chữ thường**.
  - Nếu dùng PostgreSQL, hãy dùng `ILIKE`.
  - Nếu dùng MySQL hoặc SQLite, dùng `LIKE` hoặc `LOWER(column) LIKE LOWER(value)`.
- Phải đảm bảo truy vấn đúng tiếng Việt có dấu hoặc tiếng Anh, không chuyển đổi dấu hay ngôn ngữ.
- Ví dụ: nếu user hỏi "sản phẩm size M màu đỏ", hãy lọc variant theo sku mà size ILIKE 'M' và color ILIKE 'đỏ'.
- KHÔNG được truy vấn trực tiếp bảng Option hay OptionValue, chỉ JOIN để lấy thông tin variant.
- Khi truy vấn dữ liệu sản phẩm product hoặc variant, luôn bao gồm ít nhất các trường sau trong kết quả (với alias như bên dưới):

  - product.title AS title
  - variant.sku AS sku
  - variant.image_url AS imageUrl
  - variant.price AS price
  - variant.compare_at AS compareAt

- Kết quả trả về phải có đúng các cột alias như trên, không đổi tên.

Yêu cầu:

- Trả về câu SQL SELECT hợp lệ, dùng truy vấn không phân biệt hoa thường như hướng dẫn trên.
- KHÔNG thêm chú thích hay giải thích, chỉ trả về câu SQL.

Câu hỏi: {{input}}

SQL:
"""
    return PromptTemplate.from_template(template.format(schema_str=schema_str))

sql_prompt = create_sql_prompt(schema_str)

gemini_llm = GeminiLLM(api_key=os.getenv("GEMINI_API_KEY"))

class QueryRequest(BaseModel):
    question: str

def normalize_row(row):
    return {
        "title": row.get("title"),
        "sku": row.get("sku"),
        "imageUrl": row.get("imageUrl"),
        "price": row.get("price"),
        "compareAt": row.get("compareAt"),
    }

def is_count_question(question: str) -> bool:
    count_keywords = [
        "bao nhiêu", "số lượng", "đếm", "có bao nhiêu", "tổng số", "count", "lượng sản phẩm"
    ]
    question_lower = question.lower()
    return any(keyword in question_lower for keyword in count_keywords)

def is_product_related(question: str) -> bool:
    keywords = [
    "giá", "price", "màu", "color", "kích thước", "size",
    "sku", "tên", "title", "hình ảnh", "image", "hàng",
    "tồn kho", "mua", "bán",
    "chiết khấu", "discount", "khuyến mãi", "sale", "giảm giá", "bảo hành", "warranty",
    "hỗ trợ kỹ thuật", "cài đặt", "sản phẩm mới", "cập nhật", "mới nhất", "phụ kiện", "accessory",
    "mua trả góp", "trả góp", "thanh toán", "vận chuyển", "giao hàng", "nhận hàng", "tốc độ vận chuyển",
    "công nghệ", "technology", "tính năng", "feature", "thương hiệu", "brand", "chất lượng",
    "hỗ trợ", "customer support", "đánh giá", "review", "tương thích", "compatible", "hệ điều hành",
    "operating system", "hình thức thanh toán", "payment method", "đổi trả", "return", "sửa chữa", "repair"
    "điện thoại di động", "smartphone", "cellphone", "tablet", "pin", "sạc", "tai nghe",
    "loa", "tủ lạnh", "máy giặt", "máy lạnh", "máy hút bụi", "máy xay sinh tố", "máy pha cà phê",
    "máy tính bảng", "laptop gaming", "card đồ họa", "ram", "vga", "ssd", "hdd", "bàn phím", "chuột",
    "màn hình máy tính", "tivi thông minh", "máy chiếu", "máy ảnh kỹ thuật số", "camera", "máy quay phim"
    ]
    q_lower = question.lower()
    return any(k in q_lower for k in keywords)

async def generate_no_data_response(question: str) -> str:
    prompt = f"""
Câu hỏi của người dùng: "{question}"

Không tìm thấy kết quả trong cơ sở dữ liệu.

Hãy phản hồi lại bằng một câu lịch sự, tự nhiên bằng tiếng Việt, giải thích rằng không có dữ liệu phù hợp với yêu cầu, ví dụ như sản phẩm hết hàng, không tồn tại, hoặc không tìm thấy thông tin.
Tránh dùng từ kỹ thuật như "database", "SQL", "truy vấn", chỉ dùng ngôn ngữ thân thiện.

Trả lời:
"""
    response = gemini_llm.invoke(prompt)
    return response.content if hasattr(response, "content") else response

async def generate_positive_response(question: str, count: int) -> str:
    prompt = f"""
Người dùng hỏi: "{question}"

Đã tìm thấy {count} kết quả phù hợp.

Hãy trả lời lại người dùng một cách thân thiện, tự nhiên bằng tiếng Việt, rằng đã tìm thấy kết quả phù hợp. Tránh dùng từ kỹ thuật như "SQL", "database", v.v.

Trả lời:
"""
    response = gemini_llm.invoke(prompt)
    return response.content if hasattr(response, "content") else response

@app.post("/query")
async def query(request: QueryRequest):
    try:
        if not is_product_related(request.question):
            return {
                "message": "Xin lỗi bạn, hiện tại tôi chỉ hỗ trợ trả lời các câu hỏi liên quan đến sản phẩm. Bạn có thể hỏi về giá, màu sắc, kích thước hoặc các thông tin liên quan đến sản phẩm nhé!",
                "data": []
            }

        if is_count_question(request.question):
            sql = "SELECT COUNT(*) AS count FROM products"

            with engine.connect() as conn:
                result = conn.execute(text(sql))
                count = result.scalar()

            message = await generate_positive_response(request.question, count)
            return {"message": message.strip(), "count": count, "data": []}

        else:
            chain = sql_prompt | gemini_llm
            response = chain.invoke({"input": request.question})
            sql = response.content if hasattr(response, "content") else response

            sql = re.sub(r"^```sql\s*", "", sql.strip())
            sql = re.sub(r"\s*```$", "", sql)

            if not sql.lower().strip().startswith("select"):
                raise HTTPException(status_code=400, detail="Chỉ cho phép câu truy vấn SELECT.")

            with engine.connect() as conn:
                result = conn.execute(text(sql))
                rows = result.mappings().all()

            normalized_rows = [normalize_row(dict(r)) for r in rows]

            if normalized_rows:
                message = await generate_positive_response(request.question, len(normalized_rows))
                return {"message": message.strip(), "data": normalized_rows}
            else:
                friendly_response = await generate_no_data_response(request.question)
                return {"message": friendly_response.strip(), "data": []}

    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Lỗi server: {str(e)}")
