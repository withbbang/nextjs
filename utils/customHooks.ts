import { useCommonStore } from "@/stores/common";
import { useEffect, useState } from "react";
import { handleSetCatchClause } from "./utils";
import { getAPI } from "./apis";
import { useQuery } from "@tanstack/react-query";

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
 * @param {function} cb 에러팝업 콜백
 * @returns
 */
export function useGetQuery(key: string, url: string, cb?: () => void) {
  const {
    handleSetIsLoading,
    handleSetMessage,
    handleSetIsErrorPopupActive,
    handleSetErrorBtn,
  } = useCommonStore();
  const { data, isError, isLoading } = useQuery([key], () => getAPI(url), {
    refetchOnWindowFocus: false, // 윈도우 클릭시 마다 데이터 리페칭 유무
    // refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
  });

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
