import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [],
    providers: [
        SocketGateway, SocketService, PrismaService
    ],
})
export class SocketModule { }
