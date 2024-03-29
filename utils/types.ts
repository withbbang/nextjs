/*********************************************************************************
 ***************************** 전역에서 사용하는 타입들 정의 ****************************
 ********************************************************************************/

/**
 * [useQueryCustomHook 훅의 파라미터 타입]
 *
 * @type {Array<string | number>} keys: useQuery key 배열
 * @type {string} url: api url
 * @type {Object | undefined} options: useQuery 옵션
 * @type {Function | undefined} failCb: API 실패시 바로 실행하는 콜백
 * @type {Function | undefined} errorPopupBtnCb: 에러팝업 버튼 콜백
 */
export interface TypeUseQueryCustomHookParams {
  keys: Array<string | number>;
  url: string;
  options?: Object;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * [useMutationCustomHook 훅의 파라미터 타입]
 *
 * @type {string} url: api url
 * @type {any} params: body data
 * @type {Function | undefined} checkValidatioinCb: 요청 전 유효성 검사 콜백
 * @type {Function | undefined} successCb: API 성공시 실행하는 콜백
 * @type {Function | undefined} failCb: API 실패시 바로 실행하는 콜백
 * @type {Function | undefined} errorPopupBtnCb: 에러팝업 버튼 콜백
 */
export interface TypeUseMutationCustomHookParams {
  url: string;
  params?: any;
  checkValidatioinCb?: () => any;
  successCb?: (response?: any) => any;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * [useMutationCustomByConfirmPopupHook 훅의 파라미터 타입]
 *
 * @type {string} message: 팝업 message
 * @type {string} url: api url
 * @type {any} params: body data
 * @type {Function | undefined} checkValidatioinCb: 요청 전 유효성 검사 콜백
 * @type {Function | undefined} successCb: API 성공시 실행하는 콜백
 * @type {Function | undefined} cancelBtnCb: 팝업 취소 버튼 콜백
 * @type {Function | undefined} failCb: API 실패시 바로 실행하는 콜백
 * @type {Function | undefined} errorPopupBtnCb: 에러팝업 버튼 콜백
 */
export interface TypeUseMutationCustomHookByConfirmPopupHookParams {
  message: string;
  url: string;
  params?: any;
  checkValidatioinCb?: () => any;
  successCb?: (response?: any) => any;
  cancelBtnCb?: () => any;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * zustand 전역 상태관리 store 타입
 */
export interface TypeCommon {
  message: string;
  errorPopupMessage: string;
  isLoading: boolean;
  isConfirmPopupActive: boolean;
  isErrorPopupActive: boolean;
  confirmBtnCb?: () => void;
  cancelBtnCb?: () => void;
  errorBtnCb?: () => void;
  useSetMessage: (message: string) => void;
  useSetErrorPopupMessage: (errorPopupMessage: string) => void;
  useSetIsLoading: (isLoading: boolean) => void;
  useSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) => void;
  useSetIsErrorPopupActive: (isErrorPopupActive: boolean) => void;
  useSetConfirmBtnCb: (confirmBtnCb?: () => void) => void;
  useSetCancelBtnCb: (cancelBtnCb?: () => void) => void;
  useSetErrorBtnCb: (errorBtnCb?: () => void) => void;
}

export interface TypeSVG {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}

/**
 * [API Error 일반 타입]
 */
export interface TypeAPIError extends Error {
  redirectUrl: string;
  notFound: boolean;
  code?: string;
  name: string;
}

/**
 * [API 네트워크 에러가 났을 경우 호출되는 함수(handleThrowErrorInAPI)의 파라미터 타입]
 *
 * @type {number} status: 상태 코드
 * @type {string | undefined} message: 메세지
 * @type {Function | undefined} failCb: API 실패시 바로 실행하는 콜백
 * @type {Function | undefined} errorPopupBtnCb: 에러팝업 버튼 콜백
 */
export interface TypeThrowErrorInAPI {
  status: number;
  message?: string;
  failCb?: (code?: string, message?: string) => any;
  errorPopupBtnCb?: (code?: string, message?: string) => any;
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 타입]
 *
 * @type {string} code: 결과 코드
 * @type {string} message: 메세지
 * @type {Function | undefined} failCb: API 실패시 바로 실행하는 콜백
 * @type {Function | undefined} errorPopupBtnCb: 에러팝업 버튼 콜백
 */
export interface TypeThrowCustomErrorInAPI {
  code: string;
  message: string;
  failCb?: (code?: string, message?: string) => any;
  errorPopupBtnCb?: (code?: string, message?: string) => any;
}

export interface TypeKeyValueForm {
  [key: string]: number | string;
}
