import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8002, { cors: true })
export class TodosGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('TodosGateway');

  @WebSocketServer() wss: any;

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliet disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendTodo')
  handleSendTodo(@MessageBody() payload: string): void {
    console.log(payload);
    this.wss.emit('receiveTodo', payload);
  }
}
