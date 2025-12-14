import { KeyRound, MessageSquare, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Route } from "./route.interface";

export function DashboardNav() {
  const t = useTranslations("layout.sidebar.dashboardNav");

  const routes: Route[] = [
    {
      label: t("settings"),
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      label: t("keys"),
      href: "/dashboard/keys",
      icon: KeyRound,
    },
    {
      label: t("chatSettings"),
      href: "/dashboard/chat",
      icon: MessageSquare,
    },
  ];

  return <div></div>;
}
