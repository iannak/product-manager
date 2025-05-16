import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config/env.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Configuração do Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Product and Order Management API')
    .setDescription('API documentation for managing products and orders')
    .setVersion('1.0')
    .addTag('products')
    .addTag('orders')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Inicializa a aplicação
  await app.listen(config.port, '0.0.0.0');
  console.log(`🚀 Server ready at: http://localhost:${config.port}`);
  console.log(
    `📚 Swagger docs available at: http://localhost:${config.port}/api`,
  );
}

bootstrap();
