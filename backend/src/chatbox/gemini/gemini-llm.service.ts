import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeminiLlmService {
  private readonly endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private readonly apiKey: string) {}

  async invoke(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.endpoint}?key=${this.apiKey}`,
        {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.1,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }
}
