import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    SocketModule,],
  controllers: [AppController],
  providers: [
    AppService],
})
export class AppModule { }
