"useClient";

import { PropsWithChildren, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/tw-merge";

export function LayoutContainer({ children }: PropsWithChildren<unknown>) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const { isCollapsed, collapse, open } = useSidebar();

  useEffect(() => {
    if (!isMobile && !isCollapsed && !isMobile) {
      open();
    } else if (!isMobile && isCollapsed) {
      collapse();
    }
  }, [isMobile, isCollapsed, collapse, open]);

  return (
    <main
      className={cn(
        "mt-[75px] flex-1 px-8",
        isCollapsed ? "ml-16" : "ml-16 lg:ml-64",
      )}
    >
      {children}
    </main>
  );
}
