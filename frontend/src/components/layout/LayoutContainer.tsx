import { PropsWithChildren } from "react";

export function LayoutContainer({ children }: PropsWithChildren<unknown>) {
  return <main className="mt-[75px] flex-1 px-8">{children}</main>;
}
