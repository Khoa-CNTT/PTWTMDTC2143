import { PromptTemplate } from '@langchain/core/prompts';

export function createSqlPrompt(schemaStr: string): PromptTemplate {
  const template = `
Bạn là trợ lý AI chuyển câu hỏi ngôn ngữ tự nhiên sang câu SQL SELECT hợp lệ theo schema sau.

Schema database:
${schemaStr}

Hướng dẫn đặc biệt:

- Tất cả thuộc tính như size, color, màu sắc, kích thước... là thuộc tính của biến thể (variant).
- Khi truy vấn variant theo thuộc tính, hãy dùng truy vấn **không phân biệt chữ hoa chữ thường**.
  - Vì dùng MySQL hoặc SQLite, KHÔNG sử dụng \`ILIKE\`.
  - Thay vào đó, dùng \`LIKE\` hoặc \`LOWER(column) LIKE LOWER(value)\`.
- KHÔNG được truy vấn trực tiếp bảng Option hay OptionValue, chỉ JOIN để lấy thông tin variant.
- Khi truy vấn dữ liệu sản phẩm, luôn bao gồm các cột:
  - product.title AS title
  - variant.sku AS sku
  - variant.image_url AS imageUrl
  - variant.price AS price
  - variant.size AS size
  - variant.color AS color

Yêu cầu:
- Trả về câu SQL SELECT hợp lệ.
- KHÔNG thêm chú thích, chỉ trả về SQL.

Câu hỏi: {{input}}

SQL:
`;

  return PromptTemplate.fromTemplate(template);
}
