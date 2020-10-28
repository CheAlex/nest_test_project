import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app-module/app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as redis from 'redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const connectRedis = require('connect-redis');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    session({
      secret: 'secret service',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000* 3600 * 24 * 7, // 7days
      },
      unset: 'destroy',
      store: new (connectRedis(session))({ client: redis.createClient() }),
      name: process.env.APP_SESSION_COOKIE_NAME,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Nest.js Fundamentals Final Project Docs')
    .setDescription('Nest.js Fundamentals Final Project Docs')
    .setVersion('1.0')
    .addTag('Auth', 'Эндпоинты для аутентификации и авторизации')
    .addTag('Users', 'Эндпоинты для управления пользователями')
    .addTag('Classes', 'Эндпоинты для управления потоками')
    .addTag('Lessons', 'Эндпоинты для управления уроками')
    .addTag('Videos', 'Эндпоинты для управления видео')
    .addTag('Keynotes', 'Эндпоинты для управления презентациями')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
void bootstrap();
