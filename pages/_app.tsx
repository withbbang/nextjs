import "@/styles/globals.css";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useState } from "react";
import { appWithTranslation } from "next-i18next";
import Loader from "@/components/Loader";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0, // 데이터 요청 실패시 재요청 횟수(전역적으로 설정, 지역적으로 따로 설정 가능)
          },
        },
      })
  );

  return (
    <>
      <Loader />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App);
