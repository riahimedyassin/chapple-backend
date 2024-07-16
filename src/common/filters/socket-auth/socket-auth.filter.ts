import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch(TokenExpiredError)
export class SocketAuthFilter<TokenExpiredError> implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    client.emit('error', 'Unauthorized');
    client.disconnect();
  }
}
