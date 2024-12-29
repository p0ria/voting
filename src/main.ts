import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bindGlobalPipes } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  bindGlobalPipes(app);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000).then(async () => {
    console.log(`Server is running on ${await app.getUrl()}`);
  });
}
bootstrap();
