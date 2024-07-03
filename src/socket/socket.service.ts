import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketService {
    constructor(
        private readonly prismaService: PrismaService,
      ) {}

    async saveMessage(content: string, userId: number): Promise<number> {
        try {
            const message = await this.prismaService.message.create({
                data: {
                    content: content,
                    userId: userId
                }
            });
            return message.id
        } catch (err) {
            console.log(err);
        }
    }
 }
