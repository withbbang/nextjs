/*********************************************************************************
 ***************************** 전역에서 사용하는 타입들 정의 ****************************
 ********************************************************************************/

/**
 * useQueryCustom 훅의 파라미터 타입
 */
export interface TypeUseQueryCustomHookParams {
  keys: Array<string | number>;
  url: string;
  options?: Object;
  errorCb?: () => any;
}

/**
 * useMutationCustom 훅의 파라미터 타입
 */
export interface TypeUseMstaionCustomHookParams {
  url: string;
  errorCb?: () => any;
}

/**
 * useMutationCustomByConfirmPopup 훅의 파라미터 타입
 */
export interface TypeUseMutationCustomHookByConfirmPopupHookParams {
  message: string;
  url: string;
  successCb?: () => any;
  cancelCb?: () => any;
  errorCb?: () => any;
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
 * API Error 일반 타입
 */
export interface TypeAPIError extends Error {
  redirectUrl: string;
  notFound: boolean;
  code?: string;
  name: string;
}

/**
 * API 네트워크 에러가 났을 경우 호출되는 함수(handleThrowErrorInAPI)의 파라미터 타입
 */
export interface TypeThrowErrorInAPI {
  status: number;
  message?: string;
  errorCb?: () => any;
}

/**
 * Status Code는 정상이지만 서버 로직에 의한 에러 타입
 */
export interface TypeThrowCustomErrorInAPI {
  code: string;
  message: string;
  errorCb?: () => any;
}
