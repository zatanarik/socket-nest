import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketService {
    constructor(
        private readonly prismaService: PrismaService,
      ) {}

    async saveMessage(content: string, userId: number): Promise<void> {
        try {
            await this.prismaService.message.create({
                data: {
                    content: content,
                    userId: userId
                }
            });
        } catch (err){
            console.error(err, new Date());
        }
    }
 }
