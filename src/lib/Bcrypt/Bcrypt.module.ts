import { Global, Module } from '@nestjs/common';
import { BcryptService } from './Bcrypt.service';

@Global()
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
