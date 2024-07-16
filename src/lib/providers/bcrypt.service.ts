import { Global, Injectable } from '@nestjs/common';
import { genSaltSync, compare, hash } from 'bcrypt';
import { NonNullableAny } from '@common/types/NonNullableAny.type';
@Injectable()
export class BcryptService {
  private readonly salt: string;
  constructor() {
    this.salt = genSaltSync();
  }
  async encrypt(data: NonNullableAny) {
    return hash(data, this.salt);
  }
  async compare(data: NonNullableAny, hashed: string) {
    return compare(data, hashed);
  }
}
