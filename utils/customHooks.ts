/*********************************************************************************
 *********************************** 커스텀훅 정의 **********************************
 ********************************************************************************/
import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  TypeUseMstaionCustomParams,
  TypeUseMutationCustomByConfirmPopupParams,
  TypeUseQueryCustomParams,
} from "./types";

/**
 * [useQuery 커스텀 훅]
 *
 * key 배열, url, useQeury Option, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseQueryCustomParams} parameters
 * @returns {any}
 */
export function useQueryCustom(parameters: TypeUseQueryCustomParams): any {
  const { keys, url, cb } = parameters;
  const { data } = useQuery(keys, () => getAPI(url, cb));

  return data;
}

/**
 * [uesMutation 커스텀 훅]
 *
 * url, params, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseMstaionCustomParams} parameters
 * @returns {UseMutationResult}
 */
export function useMutationCustom(
  parameters: TypeUseMstaionCustomParams
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
/**
 * [확인 팝업의 uesMutation 커스텀 훅]
 *
 * 확인 팝업 message, url, params, 성공콜백, 취소콜백, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param parameters
 * @returns
 */
export function useMutationCustomByConfirmPopup(
  parameters: TypeUseMutationCustomByConfirmPopupParams
) {
  const { message, url, params, successCb, cancelCb, errorCb } = parameters;
  const {
    handleSetMessage,
    handleSetIsLoading,
    handleSetIsConfirmPopupActive,
    handleSetIsErrorPopupActive,
    handleSetConfirmBtn,
    handleSetCancelBtn,
    handleSetErrorBtn,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: () => postAPI(url, params),
    onMutate: () => {
      handleSetIsLoading(true);
    },
    onSuccess: (response) => {
      successCb?.();
    },
    onError: (error: any) => {
      handleSetMessage(error.message);
      handleSetIsErrorPopupActive(true);
      handleSetErrorBtn(() => {
        handleSetIsErrorPopupActive(false);
        handleSetMessage("");
        errorCb?.();
      });
    },
    onSettled: () => {
      handleSetIsLoading(false);
    },
  });

  function useSetActiveConfirmPopup() {
    handleSetMessage(message);
    handleSetIsConfirmPopupActive(true);
    handleSetConfirmBtn(() => {
      mutate();
      handleSetMessage("");
      handleSetIsConfirmPopupActive(false);
    });
    handleSetCancelBtn(() => {
      cancelCb?.();
      handleSetMessage("");
      handleSetIsConfirmPopupActive(false);
    });
  }

  return { data, useSetActiveConfirmPopup };
}
