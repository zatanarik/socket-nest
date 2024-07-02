import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [
        SocketGateway, SocketService
    ],
})
export class SocketModule { }
