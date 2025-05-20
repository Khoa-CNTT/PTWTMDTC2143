// src/chatbox/chatbox.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { ChatboxController } from './chatbox.controller';
import { ChatboxService } from './chatbox.service';
import { GeminiLlmService } from './gemini/gemini-llm.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ChatboxController],
  providers: [
    ChatboxService,
    {
      provide: GeminiLlmService,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new GeminiLlmService(config.get('GEMINI_API_KEY')),
    },
  ],
})
export class ChatboxModule implements OnModuleInit {
  constructor(private readonly chatboxService: ChatboxService) {}

  async onModuleInit() {
    await this.chatboxService.initPromptTemplate();
  }
}
