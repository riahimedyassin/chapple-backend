import { Global, Logger, Module } from '@nestjs/common';
import { AppLogger } from './AppLogger.service';

@Global()
@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
