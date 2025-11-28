import { sidebarStore } from "@/store/sidebar/sidebar.store";

export function useSidebar() {
  const isCollapsed = sidebarStore((state) => state.isCollapsed);
  const setIsCollapsed = sidebarStore((state) => state.setIsCollapsed);

  const collapse = () => setIsCollapsed(true);
  const open = () => setIsCollapsed(false);

  return {
    isCollapsed,
    collapse,
    open,
  };
}
