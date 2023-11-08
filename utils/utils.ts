import {
  BadGatewayError,
  BadRequestError,
  ForbiddenError,
  InternalServerErrorError,
  MethodNotAllowedError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from "./classes";

export function handleThrowErrorInAPI(status: number, message?: string) {
  switch (status) {
    case 400:
      throw new BadRequestError(message ? message : "Bad Request Error");
    case 401:
      throw new UnauthorizedError(message ? message : "Unauthorized Error");
    case 403:
      throw new ForbiddenError(message ? message : "Forbidden Error");
    case 404:
      throw new NotFoundError(message ? message : "Not Found Error");
    case 405:
      throw new MethodNotAllowedError(
        message ? message : "Method Not Allowed Error"
      );
    case 408:
      throw new RequestTimeoutError(
        message ? message : "Request Timeout Error"
      );
    case 500:
      throw new InternalServerErrorError(
        message ? message : "Internal Server Error"
      );
    case 502:
      throw new BadGatewayError(message ? message : "Bad Gateway Error");
    case 503:
      throw new ServiceUnavailableError(
        message ? message : "Service Unavailable Error"
      );
  }
}
