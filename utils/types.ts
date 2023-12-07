/*********************************************************************************
 ***************************** 전역에서 사용하는 타입들 정의 ****************************
 ********************************************************************************/

/**
 * [useQueryCustomHook 훅의 파라미터 타입]
 *
 * @param {Array<string | number>} keys useQuery key 배열
 * @param {string} url url
 * @param {Object | undefined} options useQuery 옵션
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
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
 * @param {string} url url
 * @param {Function | undefined} successCb API 성공시 실행하는 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 */
export interface TypeUseMstaionCustomHookParams {
  url: string;
  successCb?: () => any;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * [useMutationCustomByConfirmPopupHook 훅의 파라미터 타입]
 *
 * @param {string} message 팝업 message
 * @param {string} url url
 * @param {Function | undefined} successCb API 성공시 실행하는 콜백
 * @param {Function | undefined} cancelBtnCb 팝업 취소 버튼 콜백
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 */
export interface TypeUseMutationCustomHookByConfirmPopupHookParams {
  message: string;
  url: string;
  successCb?: () => any;
  cancelBtnCb?: () => any;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * zustand 전역 상태관리 store 타입
 */
export interface TypeCommon {
  message: string;
  isLoading: boolean;
  isConfirmPopupActive: boolean;
  isErrorPopupActive: boolean;
  useConfirmBtn?: () => void;
  useCancelBtn?: () => void;
  useErrorBtn?: () => void;
  useSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) => void;
  useSetIsErrorPopupActive: (isErrorPopupActive: boolean) => void;
  useSetMessage: (message: string) => void;
  useSetIsLoading: (isLoading: boolean) => void;
  useSetConfirmBtn: (cb?: () => void) => void;
  useSetCancelBtn: (cb?: () => void) => void;
  useSetErrorBtn: (cb?: () => void) => void;
}

export interface typeSVG {
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
 * @param {number} status 상태 코드
 * @param {string | undefined} message 메세지
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 */
export interface TypeThrowErrorInAPI {
  status: number;
  message?: string;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}

/**
 * [Status Code는 정상이지만 서버 로직에 의한 에러 타입]
 *
 * @param {string} code 결과 코드
 * @param {string | undefined} message 메세지
 * @param {Function | undefined} failCb API 실패시 바로 실행하는 콜백
 * @param {Function | undefined} errorPopupBtnCb 에러팝업 버튼 콜백
 */
export interface TypeThrowCustomErrorInAPI {
  code: string;
  message: string;
  failCb?: () => any;
  errorPopupBtnCb?: () => any;
}
