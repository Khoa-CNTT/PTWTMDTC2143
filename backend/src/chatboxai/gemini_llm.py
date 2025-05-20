from langchain_core.language_models import LLM
from pydantic import Field
import requests

class GeminiLLM(LLM):
    api_key: str = Field(..., exclude=True)
    model: str = "gemini-2.0-flash"
    endpoint: str = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

    def _call(self, prompt: str, stop: list[str] | None = None) -> str:
        headers = {
            "Content-Type": "application/json"
        }

        url_with_key = f"{self.endpoint}?key={self.api_key}"

        payload = {
            "contents": [
                {"role": "user", "parts": [{"text": prompt}]}
            ],
            "generationConfig": {
                "maxOutputTokens": 1000,
                "temperature": 0.1
            }
        }

        try:
            response = requests.post(url_with_key, json=payload, headers=headers)
            response.raise_for_status()
            response_data = response.json()

            return response_data["candidates"][0]["content"]["parts"][0]["text"]

        except requests.exceptions.RequestException as e:
            raise Exception(f"Gemini API lỗi: {e}")
        
    @property
    def _llm_type(self) -> str:
        return "gemini"
