import { HttpStatus } from '@nestjs/common';

export class HttpErrorModel {
  constructor(
    public readonly message: string,
    public readonly statusCode: number | HttpStatus,
    public readonly error: string,
    public readonly stack?: string,
  ) {}
}
