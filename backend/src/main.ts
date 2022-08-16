import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const FRONTEND_DIRECTORY = join(__dirname, '..', '..', 'frontend');
const FRONTEND_DIST_DIRECTORY = join(FRONTEND_DIRECTORY, 'dist');
const FRONTEND_SRC_DIRECTORY = join(FRONTEND_DIST_DIRECTORY, 'src');
const INDEX_FILE = (name: string, extension?: string) => join(FRONTEND_SRC_DIRECTORY, name, `index.${extension || 'html'}`); 

export { FRONTEND_DIRECTORY, FRONTEND_DIST_DIRECTORY, FRONTEND_SRC_DIRECTORY, INDEX_FILE };

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useStaticAssets(join(FRONTEND_DIST_DIRECTORY, 'assets'), {
    prefix: '/assets',
  });
  app.useStaticAssets(join(FRONTEND_DIRECTORY, 'images'), {
    prefix: '/images',
  });
  await app.listen(3000);
}
bootstrap();
