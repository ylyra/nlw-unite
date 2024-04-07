import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { EventBadgeWithImage } from "@/@types/badge";

type StateProps = {
  badge: EventBadgeWithImage | null;

  saveBadge: (badge: EventBadgeWithImage) => void;
  removeBadge: () => void;
  addBadgeImage: (image: string) => void;
};

export const useBadgeStore = create(
  persist<StateProps>(
    (set) => ({
      badge: null,
      saveBadge: (badge) => set({ badge }),
      removeBadge: () => set({ badge: null }),
      addBadgeImage: (image) =>
        set((state) => ({
          badge: {
            ...state.badge!,
            image,
          },
        })),
    }),
    {
      name: "nlw-unite:badge",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
