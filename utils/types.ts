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
