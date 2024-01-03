/*********************************************************************************
 *********************************** 커스텀 훅 정의 *********************************
 ********************************************************************************/
import { useCallback, useState } from "react";
import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TypeKeyValueForm,
  TypeUseMstaionCustomHookParams,
  TypeUseMutationCustomHookByConfirmPopupHookParams,
  TypeUseQueryCustomHookParams,
} from "./types";

/**
 * [useQuery 커스텀 훅]
 *
 * key 배열, url, useQeury Option, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
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
 * url, 요청 전 유효성 검사 콜백, API 성공시 실행하는 콜백, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 * @param {TypeUseMstaionCustomHookParams} parameters
 * @returns
 */
export function useMutationCustomHook(
  parameters: TypeUseMstaionCustomHookParams
) {
  const { url, checkValidatioinCb, successCb, failCb, errorPopupBtnCb } =
    parameters;
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
      checkValidatioinCb?.();
    },
    onSuccess: (response) => {
      console.debug(response);
      successCb?.(response);
      useSetIsLoading(false);
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetIsLoading(false);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        errorPopupBtnCb?.();
      });
    },
    onSettled: () => {},
  });

  return { data, mutate };
}
/**
 * [확인 팝업의 uesMutation 커스텀 훅]
 *
 * 팝업 message, 요청 전 유효성 검사 콜백, url, API 성공시 실행하는 콜백, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 * @param parameters
 * @returns
 */
export function useMutationCustomByConfirmPopupHook(
  parameters: TypeUseMutationCustomHookByConfirmPopupHookParams
) {
  const {
    message,
    url,
    checkValidatioinCb,
    successCb,
    cancelBtnCb,
    failCb,
    errorPopupBtnCb,
  } = parameters;
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
      checkValidatioinCb?.();
    },
    onSuccess: (response) => {
      console.debug(response);
      successCb?.(response);
      useSetIsLoading(false);
    },
    onError: (error: any) => {
      useSetMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetIsLoading(false);
      useSetErrorBtn(() => {
        useSetIsErrorPopupActive(false);
        useSetMessage("");
        errorPopupBtnCb?.();
      });
    },
    onSettled: () => {},
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

/**
 * input, textarea, select tag 커스텀 훅
 * @param {TypeKeyValueForm} keyValueForm key - value 객체
 * @returns
 */
export function useChangeHook(keyValueForm: TypeKeyValueForm) {
  const [form, setForm] = useState<TypeKeyValueForm>(keyValueForm);

  // input, textarea, select onChange 콜백 함수
  const useChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { name, value } = e.currentTarget;

      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setForm]
  );

  return { form, setForm, useChange };
}
