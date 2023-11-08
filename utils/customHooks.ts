import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

/**
 * datas 가져오기 커스텀 훅
 * @param {string} key use query key
 * @param {string} url api url
 * @param {string} id specific id
 * @param {function | undefined} cb 에러팝업 콜백
 * @returns
 */
export function useQueryCustom(
  key: string,
  url: string,
  id?: string,
  cb?: () => void
): UseQueryResult {
  const { handleSetMessage, handleSetIsErrorPopupActive, handleSetErrorBtn } =
    useCommonStore();
  const { data, isError } = useQuery([key], () => getAPI(url, cb), {
    // refetchOnMount: false, // 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
    // staleTime: Infinity, // Infinity로 할시 서버사이드로 데이터 페칭 후 클라이언트사이드로 데이터 재페칭 유무
  });

  return data;
}

/**
 * datas 가져오기 커스텀 훅
 * @param {string} url api url
 * @param {any} param parameters
 * @param {string} id specific id
 * @param {function | undefined} cb 에러팝업 콜백
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
        cb?.();
      });
    },
    onSettled: () => {
      handleSetIsLoading(false);
    },
  });

  return mutation;
}
