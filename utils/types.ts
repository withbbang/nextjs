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
