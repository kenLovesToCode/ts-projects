import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosGateway } from './todos.gateway';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TodosGateway, ChatGateway],
})
export class AppModule {}
