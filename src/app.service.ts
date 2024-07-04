import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async createRoomAndJoinUser(userId: number, roomName: string) {
    try {
      const room = await this.createRoom(roomName);
      await this.prismaService.userRoom.create({
        data:{
          userId: userId,
          roomId: room.id
        }
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('неверные данные');
    }
  }

  async createRoom(roomName: string) {
    try {
      const room = await this.prismaService.room.create({
        data:{
          name: roomName
        }
      });
      return room;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('неверные данные');
    }
  }
}
