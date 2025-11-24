import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/common/Separator";
import {
  useFindNotificationsByUserQuery,
  useFindNotificationsUnreadCountQuery,
} from "@/graphql/generated/output";

export function NotificationsList() {
  const t = useTranslations("layout.headerMenu.profileMenu.notifications");

  const { refetch } = useFindNotificationsUnreadCountQuery();

  const { data, loading: isLoadingNotifications } =
    useFindNotificationsByUserQuery({
      onCompleted() {
        refetch();
      },
    });

  const notifications = data?.findNotificationsByUser ?? [];

  return (
    <>
      <h2 className="text-center text-lg font-medium">{t("heading")}</h2>
      <Separator className="my-3" />
      {isLoadingNotifications ? (
        <div className="flex items-center justify-center gap-x-2 text-sm text-foreground">
          <Loader2 className="animate-spin size-5" />
          {t("loading")}
        </div>
      ) : notifications.length ? (
        notifications.map((notification, index) => {
          return <div>{notification.message}</div>;
        })
      ) : (
        <div className="text-center text-muted-foreground">{t("empty")}</div>
      )}
    </>
  );
}
