import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class OpenaiService {
  private genAI: GoogleGenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new InternalServerErrorException('GEMINI_API_KEY not set');
    }

    this.genAI = new GoogleGenAI({ apiKey });
  }

  async generateAnswer(prompt: string): Promise<string> {
    try {
      const result = await this.genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });
      return result.text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new InternalServerErrorException('Failed to generate response');
    }
  }
}
