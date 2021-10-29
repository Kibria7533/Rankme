import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { readFile, readFileSync } from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: readFileSync('/home/rankordered/stg-rankordered-backend/ssl/b3342_337f9_09b846c1d971681406cf4eebcb25dd32.key'),
  //   cert: readFileSync('/home/rankordered/stg-rankordered-backend/ssl/stgapi_rankordered_com_b3342_337f9_1653301382_8d38ecbf5b9cf77cc0d5c079097b2b94.crt'),
  // };

  // const httpsOptions = {
  //   key: readFileSync('./ssl/kye.pem'),
  //   cert: readFileSync( './ssl/cert.pem'),
  // };

 
  const basepath = __dirname;
  const configpath = basepath.slice(0,-4);
  const configuration_file = readFileSync(configpath + 'ormconfig.json');
  const configuration = JSON.parse(configuration_file.toString());
  
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    logger: ['error', 'warn', 'log']
  });
  
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    ['/api/swagger'],
    basicAuth({
        challenge: true,
        users: {
            rankordered: '%2YU#at7tz@s',
        },
    }),
);


  const config = new DocumentBuilder()
    .setTitle('Rankordered Api List')
    .setDescription('Api list of rankordered application')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document);

  
  await app.listen(4000, () => console.log(`Rankordered app listening!` + 4000));
  // await app.listen(configuration.server_port, () => console.log(`Rankordered app listening!` + configuration.server_port));
}
bootstrap();
