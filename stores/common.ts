import { TypeCommon } from "@/utils/types";
import { StoreApi, UseBoundStore, create } from "zustand";

/**
 * 일반 전역 상태 관리 store
 */
export const useCommonStore: UseBoundStore<StoreApi<TypeCommon>> = create(
  (set) => ({
    message: "",
    errorPopupMessage: "",
    isLoading: false,
    isConfirmPopupActive: false,
    isErrorPopupActive: false,
    confirmBtnCb: undefined,
    cancelBtnCb: undefined,
    errorBtnCb: undefined,
    useSetMessage: (message: string) => set({ message }),
    useSetErrorPopupMessage: (errorPopupMessage: string) =>
      set({ errorPopupMessage }),
    useSetIsLoading: (isLoading: boolean) => set({ isLoading }),
    useSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) =>
      set({ isConfirmPopupActive }),
    useSetIsErrorPopupActive: (isErrorPopupActive: boolean) =>
      set({ isErrorPopupActive }),
    useSetConfirmBtnCb: (confirmBtnCb?: () => void) => set({ confirmBtnCb }),
    useSetCancelBtnCb: (cancelBtnCb?: () => void) => set({ cancelBtnCb }),
    useSetErrorBtnCb: (errorBtnCb?: () => void) => set({ errorBtnCb }),
  })
);

// export const useMessage = () => useCommonStore((state) => state.message);
// export const useIsLoading = () => useCommonStore((state) => state.isLoading);
// export const useIsConfirmPopupActive = () =>
//   useCommonStore((state) => state.isConfirmPopupActive);
// export const useIsErrorPopupActive = () =>
//   useCommonStore((state) => state.isErrorPopupActive);
// export const useHandleSetMessage = () =>
//   useCommonStore((state) => state.handleSetMessage);
// export const useHandleSetIsLoading = () =>
//   useCommonStore((state) => state.handleSetIsLoading);
// export const useHandleSetIsConfirmPopupActive = () =>
//   useCommonStore((state) => state.handleSetIsConfirmPopupActive);
// export const useHandleSetIsErrorPopupActive = () =>
//   useCommonStore((state) => state.handleSetIsErrorPopupActive);
// export const useHandleSetConfirmBtn = () =>
//   useCommonStore((state) => state.handleSetConfirmBtn);
// export const useHandleSetCancelBtn = () =>
//   useCommonStore((state) => state.handleSetCancelBtn);
// export const useHandleSetErrorBtn = () =>
//   useCommonStore((state) => state.handleSetErrorBtn);
