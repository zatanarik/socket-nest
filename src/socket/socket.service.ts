import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SocketService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveMessage(content: string, userId: number): Promise<number> {
    try {
      const message = await this.prismaService.message.create({
        data: {
          content: content,
          userId: userId,
        },
      });
      return message.id;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('неверные данные');
    }
  }

  async joinToRoom(userId: number, roomId: number): Promise<number> {
    try {
      const userRoom = await this.prismaService.userRoom.create({
        data: {
          userId: userId,
          roomId: roomId,
        },
      });
      return userRoom.id;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('неверные данные');
    }
  }

  async findRoomsByUserId(userId: number): Promise<{room: {name: string}}[]> {
    try {
      const rooms = await this.prismaService.userRoom.findMany({
        select:{
          room:{
            select:{
              name:true,
            }
          }

        },
        where:{
          userId:userId
        }
      });
      return rooms;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('неверные данные');
    }
  }
}
