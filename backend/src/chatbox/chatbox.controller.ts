import { Controller, Post, Body } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { QueryRequestDto } from './dto/query-request.dto';

@Controller('query')
export class ChatboxController {
  constructor(private readonly chatboxService: ChatboxService) {}

  @Post()
  async query(@Body() dto: QueryRequestDto) {
    const data = await this.chatboxService.query(dto.question);
    return { data };
  }
}
