import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR } from 'src/config/error';
import { GlobalVariable } from 'src/config/global.variable';

interface IHttpException extends HttpException {
  messageEn: string;
  messageTh: string;
}

interface ErrorResponseForm {
  message: string;
  error?: ERROR;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  protected logger = new Logger('HttpExceptionFilter');

  catch(exception: IHttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    //NOTE: Exception
    const exceptionMessageEN = exception.messageEn || exception.message;
    const exceptionMessageTH = exception.messageTh || 'กรอกข้อมูลไม่ถูกต้อง';
    const exceptionCause = exception.cause;

    const exceptionResponse = exception.getResponse();

    //TODO: creteErrorResponseForm
    function createErrorResponseForm({
      errorMessage,
    }: {
      errorMessage: string;
      error?: ERROR;
    }): ErrorResponseForm {
      return {
        message: errorMessage,
      };
    }

    if (GlobalVariable.mode === 'development') {
      this.logger.debug(exceptionMessageEN, exception.stack);
    }
    const errorResponse = createErrorResponseForm({
      errorMessage: exceptionMessageEN,
    });

    if (exception instanceof BadRequestException)
      response.status(status).json(exceptionResponse);
    else response.status(status).json(errorResponse);
  }
}
