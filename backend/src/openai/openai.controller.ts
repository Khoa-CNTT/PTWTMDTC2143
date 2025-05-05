import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ChatRequestDto } from './dto/create-chat.request';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}
  @Post('chat')
  async chat(@Body() chatRequest: ChatRequestDto) {
    const response = await this.openaiService.generateAnswer(
      chatRequest.message
    );
    return { response };
  }
}
