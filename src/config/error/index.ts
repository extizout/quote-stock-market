// export * as business from './business-error';

export interface ERROR extends Error {
  type: string;
  result: false;
  code: number;
  data: string;
}

export const isBusinessErrorGuard = (
  obj: any,
): obj is ERROR & { type: 'business' } => {
  if (isErrorGuard(obj)) {
    if (obj.type === 'business') {
      return true;
    }
  }
  return false;
};

export const isErrorGuard = (obj: any): obj is ERROR => {
  if (obj.result === false) {
    return true;
  }
  return false;
};
