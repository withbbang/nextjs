import "@/styles/globals.css";
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { useState } from "react";
import { appWithTranslation } from "next-i18next";
import Loader from "@/components/Loader";

function App({ Component, pageProps }: AppProps) {
  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;

      console.debug("error in mutation: ", error);
    },
  });
  const queryCache = new QueryCache({
    onError: (error) => console.debug("error in useQuery: ", error),
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0, // 데이터 요청 실패시 재요청 횟수(전역적으로 설정, 지역적으로 따로 설정 가능)
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Loader />
        {/* <ErrorPopup /> */}
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
