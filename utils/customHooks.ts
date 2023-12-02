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
  TypeUseMstaionCustomHookParams,
  TypeUseMutationCustomHookByConfirmPopupParams,
  TypeUseQueryCustomHookParams,
} from "./types";

/**
 * [useQuery 커스텀 훅]
 *
 * key 배열, url, useQeury Option, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseQueryCustomHookParams} parameters
 * @returns {any}
 */
export function useQueryCustomHook(
  parameters: TypeUseQueryCustomHookParams
): any {
  const { keys, url, cb } = parameters;
  const { data } = useQuery(keys, () => getAPI(url, cb));

  return data;
}

/**
 * [uesMutation 커스텀 훅]
 *
 * url, params, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseMstaionCustomHookParams} parameters
 * @returns {UseMutationResult}
 */
export function useMutationCustom(
  parameters: TypeUseMstaionCustomHookParams
): UseMutationResult<any, any, void, void> {
  const { url, params, cb } = parameters;
  const {
    useSetIsLoading,
    useSetMessage,
    useSetIsErrorPopupActive,
    useSetErrorBtn,
  } = useCommonStore();

  const mutation = useMutation({
    mutationFn: () => postAPI(url, params),
    onMutate: () => {
      useSetIsLoading(true);
    },
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        cb?.();
      });
    },
    onSettled: () => {
      useSetIsLoading(false);
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
  parameters: TypeUseMutationCustomHookByConfirmPopupParams
) {
  const { message, url, params, successCb, cancelCb, errorCb } = parameters;
  const {
    useSetMessage,
    useSetIsLoading,
    useSetIsConfirmPopupActive,
    useSetIsErrorPopupActive,
    useSetConfirmBtn,
    useSetCancelBtn,
    useSetErrorBtn,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: () => postAPI(url, params),
    onMutate: () => {
      useSetIsLoading(true);
    },
    onSuccess: (response) => {
      successCb?.();
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        errorCb?.();
      });
    },
    onSettled: () => {
      useSetIsLoading(false);
    },
  });

  function useSetActiveConfirmPopup() {
    useSetMessage(message);
    useSetIsConfirmPopupActive(true);
    useSetConfirmBtn(() => {
      mutate();
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
    });
    useSetCancelBtn(() => {
      cancelCb?.();
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
    });
  }

  return { data, useSetActiveConfirmPopup };
}
