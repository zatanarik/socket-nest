import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const API_PORT = process.env.API_PORT || 4200;

  const app = await NestFactory.create(AppModule);
  await app.listen(API_PORT).then(() => {
    console.log(`Server started on port: ${API_PORT}`);
  });
}
bootstrap();
