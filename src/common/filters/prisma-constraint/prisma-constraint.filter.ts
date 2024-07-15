import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';
import { HttpErrorModel } from 'src/common/errors/HttpError.model';

@Catch(PrismaClientKnownRequestError)
export class PrismaConstraintFilter
  implements ExceptionFilter<PrismaClientKnownRequestError>
{
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    response
      .status(400)
      .json(new HttpErrorModel(exception.message, 400, exception.name));
  }
}
