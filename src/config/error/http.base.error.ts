import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class NotFoundError extends NotFoundException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}

export class BadRequestError extends BadRequestException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}

export class UnauthorizedError extends UnauthorizedException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}

export class ForbiddenError extends ForbiddenException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}

export class InternalServerError extends InternalServerErrorException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}

export class ConflictError extends ConflictException {
  constructor(messageEn: string, messageTh: string) {
    super();
    this.messageEn = messageEn;
    this.messageTh = messageTh;
  }

  readonly messageEn: string;
  readonly messageTh: string;
}
