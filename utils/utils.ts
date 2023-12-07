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
 * 상태코드, 에러 메세지, API 실패시 바로 실행하는 콜백 함수를 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowErrorInAPI({
  status,
  message,
  failCb,
  errorPopupBtnCb,
}: TypeThrowErrorInAPI) {
  failCb?.();
  switch (status) {
    case 400:
      throw new BadRequestError(
        message || "Bad Request Error",
        errorPopupBtnCb
      );
    case 401:
      throw new UnauthorizedError(
        message || "Unauthorized Error",
        errorPopupBtnCb
      );
    case 403:
      throw new ForbiddenError(message || "Forbidden Error", errorPopupBtnCb);
    case 404:
      throw new NotFoundError(message || "Not Found Error", errorPopupBtnCb);
    case 405:
      throw new MethodNotAllowedError(
        message || "Method Not Allowed Error",
        errorPopupBtnCb
      );
    case 408:
      throw new RequestTimeoutError(
        message || "Request Timeout Error",
        errorPopupBtnCb
      );
    case 500:
      throw new InternalServerErrorError(
        message || "Internal Server Error",
        errorPopupBtnCb
      );
    case 502:
      throw new BadGatewayError(
        message || "Bad Gateway Error",
        errorPopupBtnCb
      );
    case 503:
      throw new ServiceUnavailableError(
        message || "Service Unavailable Error",
        errorPopupBtnCb
      );
  }
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 발생 함수]
 *
 * 코드, 에러 메세지, API 실패시 바로 실행하는 콜백 함수를 담고 있는 파라미터 객체
 * @param {TypeThrowErrorInAPI} parameters
 */
export function handleThrowCustomErrorInAPI({
  code,
  message,
  failCb,
  errorPopupBtnCb,
}: TypeThrowCustomErrorInAPI) {
  failCb?.();
  // TODO: 코드에 따라 switch case 분기 필요
  throw new CustomAPIError(message, errorPopupBtnCb);
}
