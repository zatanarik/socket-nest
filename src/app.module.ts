import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { SocketGateway } from './socket/socket.gateway';
import { SocketModule } from './socket/socket.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    SocketModule,],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService],
})
export class AppModule { }
