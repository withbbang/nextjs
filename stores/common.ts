import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

export const useCommonStore = create(
  persist<TypeCommon>(
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
      handleSetErrorBtn: (handleErrorBtn?: () => void) =>
        set({ handleErrorBtn }),
    }),
    {
      name: "common",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
