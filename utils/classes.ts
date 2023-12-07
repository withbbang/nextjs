/*********************************************************************************
 ****************************** Custom API Error 정의 *****************************
 ********************************************************************************/
export class APIError extends Error {
  constructor(message: string, errorPopupBtnCb?: () => void, code?: string) {
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
  name = "Bad Request Error";
}

// 401
export class UnauthorizedError extends APIError {
  name = "Unauthorized Error";
}

// 403
export class ForbiddenError extends APIError {
  name = "Forbidden Error";
}

// 404
export class NotFoundError extends APIError {
  name = "Not Found Error";
  notFound = true;
}

// 405
export class MethodNotAllowedError extends APIError {
  name = "Method Not Allowed Error";
}

// 408
export class RequestTimeoutError extends APIError {
  name = "Request Timeout Error";
}

// 500
export class InternalServerErrorError extends APIError {
  name = "Internal Server Error Error";
}

// 502
export class BadGatewayError extends APIError {
  name = "Bad Gateway Error";
}

// 503
export class ServiceUnavailableError extends APIError {
  name = "Service Unavailable Error";
}

// Status Code는 정상이지만 서버 로직에 의한 에러
export class CustomAPIError extends APIError {
  name = "Custom API Error";
}
