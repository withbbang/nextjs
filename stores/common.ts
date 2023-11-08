import { StoreApi, UseBoundStore, create } from "zustand";

export interface TypeCommon {
  message: string;
  isLoading: boolean;
  isConfirmPopupActive: boolean;
  isErrorPopupActive: boolean;
  handleConfirmBtn?: () => void;
  handleCancelBtn?: () => void;
  handleErrorBtn?: () => void;
  handleSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) => void;
  handleSetIsErrorPopupActive: (isErrorPopupActive: boolean) => void;
  handleSetMessage: (message: string) => void;
  handleSetIsLoading: (isLoading: boolean) => void;
  handleSetConfirmBtn: (cb?: () => void) => void;
  handleSetCancelBtn: (cb?: () => void) => void;
  handleSetErrorBtn: (cb?: () => void) => void;
}

export const useCommonStore: UseBoundStore<StoreApi<TypeCommon>> = create(
  (set) => ({
    message: "",
    isLoading: false,
    isConfirmPopupActive: false,
    isErrorPopupActive: false,
    handleSetMessage: (message: string) => set({ message }),
    handleSetIsLoading: (isLoading: boolean) => set({ isLoading }),
    handleSetIsConfirmPopupActive: (isConfirmPopupActive: boolean) =>
      set({ isConfirmPopupActive }),
    handleSetIsErrorPopupActive: (isErrorPopupActive: boolean) =>
      set({ isErrorPopupActive }),
    handleSetConfirmBtn: (handleConfirmBtn?: () => void) =>
      set({ handleConfirmBtn }),
    handleSetCancelBtn: (handleCancelBtn?: () => void) =>
      set({ handleCancelBtn }),
    handleSetErrorBtn: (handleErrorBtn?: () => void) => set({ handleErrorBtn }),
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
