import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAddress = create(
  persist(
    (set, get) => ({
      address: {},
      additionalInfo: {},
      addAddress: (address) => {
        set({ address });
      },

      removeAddress: () => set({ address: {} }),

      addAdditionalInfo: (additionalInfo) => {
        set({ additionalInfo });
      },

      removeAdditionalInfo: () => set({ additionalInfo: {} }),
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAddress;
