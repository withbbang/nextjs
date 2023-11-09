/*********************************************************************************
 ***************************** 전역에서 사용하는 타입들 정의 ****************************
 ********************************************************************************/

/**
 * useQueryCustom 훅의 파라미터 타입
 */
export interface TypeUseQueryCustomParams {
  keys: Array<string | number>;
  url: string;
  options?: Object;
  cb?: () => any;
}

/**
 * useMutationCustom 훅의 파라미터 타입
 */
export interface TypeUseMstaionCustomParams {
  url: string;
  params: Object;
  cb?: () => any;
}

/**
 * useMutationCustomByConfirmPopup 훅의 파라미터 타입
 */
export interface TypeUseMutationCustomByConfirmPopupParams {
  message: string;
  url: string;
  params: Object;
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
  handleConfirmBtn?: () => void;
  handleCancelBtn?: () => void;
  handleErrorBtn?: () => void;
  handleSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) => void;
  handleSetIsErrorPopupActive: (isErrorPopupActive: boolean) => void;
  handleSetMessage: (message: string) => void;
  handleSetIsLoading: (isLoading: boolean) => void;
  handleSetConfirmBtn: (cb?: () => void) => void;
  handleSetCancelBtn: (cb?: () => void) => void;
  handleSetErrorBtn: (cb?: () => void) => void;
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
  cb?: () => any;
}

/**
 * Status Code는 정상이지만 서버 로직에 의한 에러 타입
 */
export interface TypeThrowCustomErrorInAPI {
  code: string;
  message: string;
  cb?: () => any;
}
