/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketService {
    constructor(
        private readonly prismaService: PrismaService,
      ) {}

    async saveMessage(content: string, userId: number): Promise<void> {
        await this.prismaService.message.create({
            data: {
                content: content,
                userId: userId
            }
        });
    }
 }
