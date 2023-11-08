export interface APIError extends Error {
  redirectUrl: string;
  notFound: boolean;
  code?: string;
  name: string;
}
