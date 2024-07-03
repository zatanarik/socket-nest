/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private socketService: SocketService) {}

    @WebSocketServer()
    server: Socket;

    @SubscribeMessage('events')
    async handleEvent(@MessageBody() sendMessageDto: SendMessageDto) {
        try {
            const userId = await this.socketService.saveMessage(sendMessageDto.content, sendMessageDto.userId);
            this.server.emit("events",JSON.stringify({success:true, data:userId}) );
        } catch (err) {
            this.server.emit("events",JSON.stringify({success:false, error:err}));
        }
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }
    

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
