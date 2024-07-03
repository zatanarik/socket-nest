/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { InternalServerErrorException, Param } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private socketService: SocketService) {}

    @WebSocketServer()
    server: Socket;

    @SubscribeMessage('events')
    async handleEvent(@MessageBody() data: any) {
        const userId = await this.socketService.saveMessage(data.content, +data.userId);
        this.server.emit("events", `created message with id = ${userId}`);
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
