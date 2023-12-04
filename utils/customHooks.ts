/*********************************************************************************
 *********************************** 커스텀 훅 정의 *********************************
 ********************************************************************************/
import { useCallback } from "react";
import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import {
  UseMutationResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  TypeUseMstaionCustomHookParams,
  TypeUseMutationCustomHookByConfirmPopupHookParams,
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
  const { keys, url, errorCb } = parameters;
  const { data } = useQuery(keys, () => getAPI(url, errorCb));

  return data;
}

/**
 * [uesMutation 커스텀 훅]
 *
 * url, params, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param {TypeUseMstaionCustomHookParams} parameters
 * @returns
 */
export function useMutationCustomHook(
  parameters: TypeUseMstaionCustomHookParams
) {
  const { url, errorCb } = parameters;
  const {
    useSetIsLoading,
    useSetMessage,
    useSetIsErrorPopupActive,
    useSetErrorBtn,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: (params: any) => postAPI(url, params),
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
        errorCb?.();
      });
    },
    onSettled: () => {
      useSetIsLoading(false);
    },
  });

  return { data, mutate };
}
/**
 * [확인 팝업의 uesMutation 커스텀 훅]
 *
 * 확인 팝업 message, url, params, 성공콜백, 취소콜백, 에러팝업 콜백 담고 있는 파라미터 객체
 * @param parameters
 * @returns
 */
export function useMutationCustomByConfirmPopupHook(
  parameters: TypeUseMutationCustomHookByConfirmPopupHookParams
) {
  const { message, url, successCb, cancelCb, errorCb } = parameters;
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
    mutationFn: (params) => postAPI(url, params),
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

  const useSetActiveConfirmPopup = useCallback((params: any) => {
    useSetMessage(message);
    useSetIsConfirmPopupActive(true);
    useSetConfirmBtn(() => {
      mutate(params);
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
    });
    useSetCancelBtn(() => {
      cancelCb?.();
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
    });
  }, []);

  return { data, useSetActiveConfirmPopup };
}
