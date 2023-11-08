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
import { ThrowErrorInAPIType } from "./types";

export function handleThrowErrorInAPI({
  status,
  message,
  cb,
}: ThrowErrorInAPIType) {
  switch (status) {
    case 400:
      throw new BadRequestError(message ? message : "Bad Request Error", cb);
    case 401:
      throw new UnauthorizedError(message ? message : "Unauthorized Error", cb);
    case 403:
      throw new ForbiddenError(message ? message : "Forbidden Error", cb);
    case 404:
      throw new NotFoundError(message ? message : "Not Found Error", cb);
    case 405:
      throw new MethodNotAllowedError(
        message ? message : "Method Not Allowed Error",
        cb
      );
    case 408:
      throw new RequestTimeoutError(
        message ? message : "Request Timeout Error",
        cb
      );
    case 500:
      throw new InternalServerErrorError(
        message ? message : "Internal Server Error",
        cb
      );
    case 502:
      throw new BadGatewayError(message ? message : "Bad Gateway Error", cb);
    case 503:
      throw new ServiceUnavailableError(
        message ? message : "Service Unavailable Error",
        cb
      );
  }
}
