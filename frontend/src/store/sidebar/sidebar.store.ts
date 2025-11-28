import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SidebarStore } from "@/store/sidebar/sidebar.types";

export const sidebarStore = create(
  persist<SidebarStore>(
    (set) => ({
      isCollapsed: false,
      setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
