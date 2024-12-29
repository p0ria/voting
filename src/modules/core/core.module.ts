import { Global, Module } from '@nestjs/common';
import { SERVICES } from './services';

@Global()
@Module({
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class CoreModule {}
