import { AppLogger } from '@core/logger/AppLogger.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeBigintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(this.manipulateData));
  }
  private manipulateData(data: any) {
    return JSON.parse(
      JSON.stringify(data, (key, value) => {
        return typeof value === 'bigint' ? value.toString() : value;
      }),
    );
  }
}
