import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { TypeUseMustaionCustomParams, TypeUseQueryCustomParams } from "./types";

/**
 * [useQuery 가져오기 커스텀 훅]
 *
 * key 배열, url, useQeury Option, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseQueryCustomParams} parameters
 * @returns {UseQueryResult}
 */
export function useQueryCustom(
  parameters: TypeUseQueryCustomParams
): UseQueryResult {
  const { keys, url, cb } = parameters;
  const { data } = useQuery(keys, () => getAPI(url, cb));

  return data;
}

/**
 * [uesMutation 가져오기 커스텀 훅]
 *
 * url, params, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseMustaionCustomParams} parameters
 * @returns {UseMutationResult}
 */
export function useMutationCustom(
  parameters: TypeUseMustaionCustomParams
): UseMutationResult<any, any, void, void> {
  const { url, params, cb } = parameters;
  const {
    handleSetIsLoading,
    handleSetMessage,
    handleSetIsErrorPopupActive,
    handleSetErrorBtn,
  } = useCommonStore();
  const mutation = useMutation({
    mutationFn: () => postAPI(url, params),
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
