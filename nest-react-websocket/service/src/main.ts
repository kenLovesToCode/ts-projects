import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(5099);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as fs from 'fs';

// async function bootstrap() {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//   const httpsOptions = {
//     key: fs.readFileSync('./ssl/server.key'),
//     cert: fs.readFileSync('./ssl/server.crt'),
//   };
//   const app = await NestFactory.create(AppModule, { httpsOptions });
//   app.setGlobalPrefix('api');
//   app.enableCors();

//   await app.listen(5099);
// }
// bootstrap();
