/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { SendMessageDto } from './dto/send-message.dto';
import { BadRequestException, Param } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private socketService: SocketService) {}

    //Удалить, тут не Socket от socket.io
    @WebSocketServer()
    server: Socket;

    @SubscribeMessage('events')
    async handleEvent(@MessageBody() sendMessageDto: SendMessageDto, @ConnectedSocket() client: Socket) {
        try {
            const rooms = await this.socketService.findRoomsByUserId(sendMessageDto.userId);
            const roomsNames = rooms.map(room => {
                return room.room.name
            })
            if(!roomsNames.includes(String(sendMessageDto.roomId))) {
                throw new BadRequestException('Пользователя нет в данной комнате');
            }
            const messageId = await this.socketService.saveMessage(sendMessageDto.content, sendMessageDto.userId);
            client.to(String(sendMessageDto.roomId)).emit("events",JSON.stringify({success:true, data:{messageId:messageId, content:sendMessageDto.content}}) );
        } catch (err) {
            console.log(err)
            client.emit("error",JSON.stringify({success:false, error:err}));
        }
    }
    
    @SubscribeMessage('join')
    async handleJoinToRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        try {
            await this.socketService.joinToRoom(data.userId, data.roomId);
            client.emit("join",JSON.stringify({success:true, data: data.roomId}));
        } catch (err) {
            console.log(err)
            client.emit("error",JSON.stringify({success:false, error:err}));
        }
    }

    async handleConnection(@ConnectedSocket() client: Socket) {
        try {
            //console.log(client.handshake.query);
            const userId: number = +client.handshake.query.userId
            console.log(`User connected with id = ${userId}`);
            const rooms = await this.socketService.findRoomsByUserId(userId);
            const roomsNames = rooms.map(room => {
                return room.room.name
            })
            console.log(`юзер в комнатах `, roomsNames);
            await client.join(roomsNames);
        } catch (err) {
            console.log(err)
            client.emit("error",JSON.stringify({success:false, error:err}));
            //this.server.disconnect()
        }
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }
    

    afterInit(server: any) {
        console.log('Socket is live')
    }
}
