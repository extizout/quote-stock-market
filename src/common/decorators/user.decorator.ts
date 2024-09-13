import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 *
 *@example @User() user: UserEntity, UserDto
 * @User('id') userId: number
 *
 * return req.user | '<T>'(req.user.T)
 * */
export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
