import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TypeCommon {
  error: boolean;
  loading: boolean;
  errMessage: string;
  setError: (error: boolean) => void;
  setLoading: (loading: boolean) => void;
  setErrMessage: (errMessage: string) => void;
}

export const useCommonStore = create(
  persist<TypeCommon>(
    (set) => ({
      error: false,
      loading: false,
      errMessage: "",
      setError: (error: boolean) => set({ error }),
      setLoading: (loading: boolean) => set({ loading }),
      setErrMessage: (errMessage: string) => set({ errMessage }),
    }),
    {
      name: "common",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
