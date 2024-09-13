import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { readFileSync } from 'fs';

import * as path from 'path';
import { GlobalVariable } from '../global.variable';

export const SwaggerSetting = (app: INestApplication) => {
  const swaggerConfig = readFileSync(
    path.join(__dirname, '../../../swagger.json'),
    'utf8',
  );
  const swaggerDocument = JSON.parse(swaggerConfig);

  swaggerDocument.servers.at(0).url =
    `http://localhost:${GlobalVariable.env.API_PORT}`;

  SwaggerModule.setup('api/doc', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
