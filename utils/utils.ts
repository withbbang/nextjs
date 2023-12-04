/*********************************************************************************
 **************************** 전역에서 사용하는 유틸 함수 정의 ***************************
 ********************************************************************************/
import {
  BadGatewayError,
  BadRequestError,
  CustomAPIError,
  ForbiddenError,
  InternalServerErrorError,
  MethodNotAllowedError,
  NotFoundError,
  RequestTimeoutError,
  ServiceUnavailableError,
  UnauthorizedError,
} from "./classes";
import { TypeThrowCustomErrorInAPI, TypeThrowErrorInAPI } from "./types";

/**
 * [API 상태 코드에 따른 에러 발생 함수]
 *
 * 상태코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowErrorInAPI({
  status,
  message,
  errorCb,
}: TypeThrowErrorInAPI) {
  switch (status) {
    case 400:
      throw new BadRequestError(message ? message : "Bad Request", errorCb);
    case 401:
      throw new UnauthorizedError(message ? message : "Unauthorized", errorCb);
    case 403:
      throw new ForbiddenError(message ? message : "Forbidden", errorCb);
    case 404:
      throw new NotFoundError(message ? message : "Not Found", errorCb);
    case 405:
      throw new MethodNotAllowedError(
        message ? message : "Method Not Allowed",
        errorCb
      );
    case 408:
      throw new RequestTimeoutError(
        message ? message : "Request Timeout",
        errorCb
      );
    case 500:
      throw new InternalServerErrorError(
        message ? message : "Internal Server",
        errorCb
      );
    case 502:
      throw new BadGatewayError(message ? message : "Bad Gateway", errorCb);
    case 503:
      throw new ServiceUnavailableError(
        message ? message : "Service Unavailable",
        errorCb
      );
  }
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 발생 함수]
 *
 * 코드, 에러 메세지, 에러팝업 콜백 함수 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowCustomErrorInAPI({
  code,
  message,
  errorCb,
}: TypeThrowCustomErrorInAPI) {
  // TODO: 코드에 따라 switch case 분기 필요
  throw new CustomAPIError(message, errorCb);
}
