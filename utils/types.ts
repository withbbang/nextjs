/*********************************************************************************
 ***************************** 전역에서 사용하는 타입들 정의 ****************************
 ********************************************************************************/
export interface TypeUseQueryCustomParams {
  keys: Array<string | number>;
  url: string;
  options?: Object;
  cb?: () => any;
}

export interface TypeUseMustaionCustomParams {
  url: string;
  params: Object;
  cb?: () => any;
}

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

export interface APIError extends Error {
  redirectUrl: string;
  notFound: boolean;
  code?: string;
  name: string;
}

export interface APIErrorType extends Error {
  redirectUrl: string;
  notFound: boolean;
  code?: string;
  name: string;
}

export interface ThrowErrorInAPIType {
  status: number;
  message?: string;
  cb?: () => void;
}
