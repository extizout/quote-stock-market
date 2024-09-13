import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public readonly loggerService = new Logger(LoggingInterceptor.name);

  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { path } = request;

    return next.handle().pipe(
      tap((response) => {
        const isNotTestEnvironment =
          this.configService.get<string>('NODE_ENV')?.toLowerCase() !== 'test';
        if (isNotTestEnvironment) {
          const requestToResponse: `${number}ms` = `${Date.now() - request.now}ms`;
          this.loggerService.log(
            `logging\n${request.method} ${path} ${requestToResponse}\n` +
              `currentTime : ${new Date()}]\n`,
          );
        }
      }),
    );
  }
}
