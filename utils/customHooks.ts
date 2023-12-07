/*********************************************************************************
 *********************************** 커스텀 훅 정의 *********************************
 ********************************************************************************/
import { useCallback } from "react";
import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TypeUseMstaionCustomHookParams,
  TypeUseMutationCustomHookByConfirmPopupHookParams,
  TypeUseQueryCustomHookParams,
} from "./types";

/**
 * [useQuery 커스텀 훅]
 *
 * key 배열, url, useQeury Option, API 실패시 바로 실행하는 콜백, 에러팝업 콜백을 담고 있는 객체
 * @param {TypeUseQueryCustomHookParams} parameters
 * @returns {any}
 */
export function useQueryCustomHook(
  parameters: TypeUseQueryCustomHookParams
): any {
  const { keys, url, failCb, errorPopupBtnCb } = parameters;
  const { data } = useQuery(keys, () => getAPI(url, failCb, errorPopupBtnCb));

  return data;
}

/**
 * [uesMutation 커스텀 훅]
 *
 * url, useQeury Option, API 실패시 바로 실행하는 콜백, 에러팝업 콜백을 담고 있는 객체
 * @param {TypeUseMstaionCustomHookParams} parameters
 * @returns
 */
export function useMutationCustomHook(
  parameters: TypeUseMstaionCustomHookParams
) {
  const { url, successCb, failCb, errorPopupBtnCb } = parameters;
  const {
    useSetIsLoading,
    useSetMessage,
    useSetIsErrorPopupActive,
    useSetErrorBtn,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: (params: any) => postAPI(url, params, failCb),
    onMutate: () => {
      useSetIsLoading(true);
    },
    onSuccess: (response) => {
      console.debug(response);
      successCb?.();
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        errorPopupBtnCb?.();
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
  const { message, url, successCb, cancelBtnCb, failCb, errorPopupBtnCb } =
    parameters;
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
    mutationFn: (params) => postAPI(url, params, failCb),
    onMutate: () => {
      useSetIsLoading(true);
    },
    onSuccess: (response) => {
      console.debug(response);
      successCb?.();
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        errorPopupBtnCb?.();
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
      cancelBtnCb?.();
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
    });
  }, []);

  return { data, useSetActiveConfirmPopup };
}
