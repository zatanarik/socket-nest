import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('room')
  async createRoomAndJoinUser(@Body() data) {
      await this.appService.createRoomAndJoinUser(+data.userId, data.roomName);
      return {success:true, data:{message:'room created'}}
  }
}
