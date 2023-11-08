import { useCommonStore } from "@/stores/common";
import { useEffect, useState } from "react";
import { handleSetCatchClause } from "./utils";
import { getAPI, postAPI } from "./apis";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

/**
 * datas 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useGetDatas(url: string, cb?: () => void) {
  const { handleSetIsLoading } = useCommonStore();
  const [datas, setDatas] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        handleSetIsLoading(true);
        setDatas(await getAPI(url)); // FIXME: 수정 필요
      } catch (error: any) {
        handleSetCatchClause(error, cb);
      } finally {
        handleSetIsLoading(false);
      }
    })();
  }, [url, cb]);

  return datas;
}

/**
 * data 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {string} id data id
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useGetData(url: string, id: string, cb?: () => void) {
  const { handleSetIsLoading } = useCommonStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        handleSetIsLoading(true);
        setData(await getAPI(url)); // FIXME: 수정 필요
      } catch (error: any) {
        handleSetCatchClause(error, cb);
      } finally {
        handleSetIsLoading(false);
      }
    })();
  }, [url, id, cb]);

  return data;
}

/**
 * datas 가져오기 커스텀 훅
 * @param {string} key use query key
 * @param {string} url api url
 * @param {string} id specific id
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useQueryCustom(
  key: string,
  url: string,
  id?: string,
  cb?: () => void
): UseQueryResult {
  const {
    handleSetIsLoading,
    handleSetMessage,
    handleSetIsErrorPopupActive,
    handleSetErrorBtn,
  } = useCommonStore();
  const { data, isError, isLoading, error } = useQuery(
    [key],
    () => getAPI(url),
    {
      // refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
      // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    }
  );

  handleSetIsLoading(isLoading);

  if (isError) {
    handleSetMessage("Error Occured");
    handleSetIsErrorPopupActive(true);
    handleSetErrorBtn(() => {
      handleSetIsErrorPopupActive(false);
      handleSetMessage("");
      cb?.();
    });
  }

  return data;
}

/**
 * datas 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {any} param parameters
 * @param {string} id specific id
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useMutationCustom(
  url: string,
  param: any,
  id?: string,
  cb?: () => void
): UseMutationResult<any, any, void, void> {
  const {
    handleSetIsLoading,
    handleSetMessage,
    handleSetIsErrorPopupActive,
    handleSetErrorBtn,
  } = useCommonStore();
  const mutation = useMutation({
    mutationFn: () => postAPI(url, param),
    onMutate: () => {
      handleSetIsLoading(true);
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error: any) => {
      handleSetMessage(error.message);
      handleSetIsErrorPopupActive(true);
      handleSetErrorBtn(() => {
        handleSetIsErrorPopupActive(false);
        handleSetMessage("");
        // cb?.();
      });
    },
    onSettled: () => {
      handleSetIsLoading(false);
    },
  });

  return mutation;
}
