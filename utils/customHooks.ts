/*********************************************************************************
 *********************************** 커스텀 훅 정의 *********************************
 ********************************************************************************/
import { useCallback, useState } from "react";
import { useCommonStore } from "@/stores/common";
import { getAPI, postAPI } from "./apis";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TypeKeyValueForm,
  TypeUseMutationCustomHookParams,
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
 * url, body data, 요청 전 유효성 검사 콜백, API 성공시 실행하는 콜백, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 * @param {TypeUseMutationCustomHookParams} parameters
 * @returns
 */
export function useMutationCustomHook(
  parameters: TypeUseMutationCustomHookParams
) {
  const {
    url,
    params,
    checkValidatioinCb,
    successCb,
    failCb,
    errorPopupBtnCb,
  } = parameters;
  const {
    useSetIsLoading,
    useSetErrorPopupMessage,
    useSetIsErrorPopupActive,
    useSetErrorBtnCb,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: () => postAPI(url, params, failCb, errorPopupBtnCb),
    onMutate: () => {
      useSetIsLoading(true);
      checkValidatioinCb?.();
    },
    onSuccess: (response) => {
      successCb?.(response);
      useSetIsLoading(false);
    },
    onError: (error: any) => {
      useSetIsLoading(false);
      useSetErrorPopupMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtnCb(() => {
        useSetIsErrorPopupActive(false);
        useSetErrorPopupMessage("");
        useSetErrorBtnCb();
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
 * 팝업 message, url, body data, 요청 전 유효성 검사 콜백, API 성공시 실행하는 콜백, API 실패시 바로 실행하는 콜백, 에러팝업 버튼 콜백을 담고 있는 객체
 * @param parameters
 * @returns
 */
export function useMutationCustomByConfirmPopupHook(
  parameters: TypeUseMutationCustomHookByConfirmPopupHookParams
) {
  const {
    message,
    url,
    params,
    checkValidatioinCb,
    successCb,
    cancelBtnCb,
    failCb,
    errorPopupBtnCb,
  } = parameters;
  const {
    useSetMessage,
    useSetErrorPopupMessage,
    useSetIsLoading,
    useSetIsConfirmPopupActive,
    useSetIsErrorPopupActive,
    useSetConfirmBtnCb,
    useSetCancelBtnCb,
    useSetErrorBtnCb,
  } = useCommonStore();

  const { data, mutate } = useMutation({
    mutationFn: () => postAPI(url, params, failCb, errorPopupBtnCb),
    onMutate: () => {
      useSetIsLoading(true);
      checkValidatioinCb?.();
    },
    onSuccess: (response) => {
      successCb?.(response);
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
      useSetConfirmBtnCb();
      useSetCancelBtnCb();
      useSetIsLoading(false);
    },
    onError: (error: any) => {
      useSetIsLoading(false);
      useSetErrorPopupMessage(error.message);
      useSetIsErrorPopupActive(true);
      useSetErrorBtnCb(() => {
        useSetIsErrorPopupActive(false);
        useSetErrorPopupMessage("");
        useSetErrorBtnCb();
        errorPopupBtnCb?.();
      });
    },
    onSettled: () => {},
  });

  const useSetActiveConfirmPopup = useCallback(() => {
    useSetMessage(message);
    useSetIsConfirmPopupActive(true);
    useSetConfirmBtnCb(() => {
      mutate();
    });

    useSetCancelBtnCb(() => {
      cancelBtnCb?.();
      useSetMessage("");
      useSetIsConfirmPopupActive(false);
      useSetConfirmBtnCb();
      useSetCancelBtnCb();
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
