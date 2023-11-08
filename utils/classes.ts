export class APIError extends Error {
  redirectUrl: string = "/";
  notFound: boolean = false;
  code?: string = "";
  name: string = "API Error";
}

export class BadRequestError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 400
  }

  name = "Bad Request Error";
}

export class UnauthorizedError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 401
  }

  name = "Unauthorized Error";
}

export class ForbiddenError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 403
  }

  name = "Forbidden Error";
}

export class NotFoundError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 404
  }

  name = "Not Found Error";
  notFound = true;
}

export class MethodNotAllowedError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 405
  }

  name = "Method Not Allowed Error";
}

export class RequestTimeoutError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 408
  }

  name = "Request Timeout Error";
  notFound = true;
}

export class InternalServerErrorError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 500
  }

  name = "Internal Server Error Error";
  notFound = true;
}

export class BadGatewayError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 502
  }

  name = "Bad Gateway Error";
  notFound = true;
}

export class ServiceUnavailableError extends APIError {
  constructor(message: string, code?: string) {
    super(message);
    this.code = code; // 503
  }

  name = "Service Unavailable Error";
  notFound = true;
}
