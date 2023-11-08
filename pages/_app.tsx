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
import ErrorPopup from "@/components/ErrorPopup";
import Loader from "@/components/Loader";
import { useCommonStore } from "@/stores/common";

function App({ Component, pageProps }: AppProps) {
  const { handleSetMessage, handleSetIsErrorPopupActive, handleSetErrorBtn } =
    useCommonStore();

  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) return;

      console.debug("error in mutation: ", error);
    },
  });

  const queryCache = new QueryCache({
    onError: (error: any) => {
      handleSetMessage(error.message);
      handleSetIsErrorPopupActive(true);
      handleSetErrorBtn(() => {
        handleSetIsErrorPopupActive(false);
        handleSetMessage("");
        error.cb?.();
      });
    },
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
            retry: 0, // 데이터 요청 실패시 재요청 횟수(전역적으로 설정, 지역적으로 따로 설정 가능)
            // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Loader />
        <ErrorPopup />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
