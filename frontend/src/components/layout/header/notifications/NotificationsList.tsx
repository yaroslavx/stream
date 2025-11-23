import { useTranslations } from "next-intl";
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
    </>
  );
}
