export class APIError extends Error {
  constructor(message: string, cb?: () => void, code?: string) {
    super(message);
    this.cb = cb;
    this.code = code;
  }

  redirectUrl: string = "/";
  notFound: boolean = false;
  code?: string = "";
  name: string = "API Error";
  cb?: () => void;
}

export class BadRequestError extends APIError {
  // 400

  name = "Bad Request Error";
}

export class UnauthorizedError extends APIError {
  // 401

  name = "Unauthorized Error";
}

export class ForbiddenError extends APIError {
  // 403

  name = "Forbidden Error";
}

export class NotFoundError extends APIError {
  // 404

  name = "Not Found Error";
  notFound = true;
}

export class MethodNotAllowedError extends APIError {
  // 405

  name = "Method Not Allowed Error";
}

export class RequestTimeoutError extends APIError {
  // 408

  name = "Request Timeout Error";
  notFound = true;
}

export class InternalServerErrorError extends APIError {
  // 500

  name = "Internal Server Error Error";
  notFound = true;
}

export class BadGatewayError extends APIError {
  // 502

  name = "Bad Gateway Error";
  notFound = true;
}

export class ServiceUnavailableError extends APIError {
  // 503

  name = "Service Unavailable Error";
  notFound = true;
}
