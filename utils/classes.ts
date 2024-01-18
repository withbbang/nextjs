/*********************************************************************************
 ****************************** Custom API Error 정의 *****************************
 ********************************************************************************/
export class APIError extends Error {
  constructor(message: string, errorPopupBtnCb?: () => any, code?: string) {
    super(message);
    this.errorPopupBtnCb = errorPopupBtnCb;
    this.code = code;
  }

  redirectUrl: string = "/";
  notFound: boolean = false;
  code?: string = "";
  name: string = "API Error";
  errorPopupBtnCb?: () => any;
}

// 400
export class BadRequestError extends APIError {
  constructor(
    message: string = "Bad Request Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Bad Request Error";
}

// 401
export class UnauthorizedError extends APIError {
  constructor(
    message: string = "Unauthorized Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Unauthorized Error";
}

// 403
export class ForbiddenError extends APIError {
  constructor(
    message: string = "Forbidden Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Forbidden Error";
}

// 404
export class NotFoundError extends APIError {
  constructor(
    message: string = "Not Found Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Not Found Error";
  notFound = true;
}

// 405
export class MethodNotAllowedError extends APIError {
  constructor(
    message: string = "Method Not Allowed Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Method Not Allowed Error";
}

// 408
export class RequestTimeoutError extends APIError {
  constructor(
    message: string = "Request Timeout Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Request Timeout Error";
}

// 500
export class InternalServerErrorError extends APIError {
  constructor(
    message: string = "Internal Server Error Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Internal Server Error Error";
}

// 502
export class BadGatewayError extends APIError {
  constructor(
    message: string = "Bad Gateway Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Bad Gateway Error";
}

// 503
export class ServiceUnavailableError extends APIError {
  constructor(
    message: string = "Service Unavailable Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Service Unavailable Error";
}

// Status Code는 정상이지만 서버 로직에 의한 에러
export class CustomAPIError extends APIError {
  constructor(
    message: string = "Custom API Error",
    errorPopupBtnCb?: () => any
  ) {
    super(message);
  }

  name = "Custom API Error";
}
