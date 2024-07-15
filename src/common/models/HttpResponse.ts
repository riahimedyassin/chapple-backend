import { HttpStatus } from '@nestjs/common';

export class HttpResponse {
  constructor(
    public readonly data: any,
    public readonly message?: string,
    public readonly statusCode: HttpStatus | number = 200,
  ) {}
}
