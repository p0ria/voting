import { INestApplication, ValidationPipe } from '@nestjs/common';
import { bindValidationPipe } from './validation.pipe';

export function bindGlobalPipes(app: INestApplication) {
  bindValidationPipe(app);
}
