import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TypeZustand {
  num: number;
  setNum: (num: number) => void;
}

export const useZustandStore = create(
  persist<TypeZustand>(
    (set) => ({
      num: 0,
      setNum: (num: number) => {
        set({ num });
      },
    }),
    {
      name: "zustand",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
