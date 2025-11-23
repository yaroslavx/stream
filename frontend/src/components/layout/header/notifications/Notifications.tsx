import { PopoverContent } from "@radix-ui/react-popover";
import { Bell } from "lucide-react";
import { NotificationsList } from "@/components/layout/header/notifications/NotificationsList";
import { Popover, PopoverTrigger } from "@/components/ui/common/Popover";
import { useFindNotificationsUnreadCountQuery } from "@/graphql/generated/output";

export function Notifications() {
  const { data, loading: isLoadingCount } =
    useFindNotificationsUnreadCountQuery();
  const count = data?.findNotificationsUnreadCount ?? 0;

  const displayCount = count > 10 ? "10+" : count;

  if (isLoadingCount) return null;

  return (
    <Popover>
      <PopoverTrigger>
        {count !== 0 && (
          <div className="absolute right-[72px] top-5 rounded-full bg-primary px-[5px] text-xs font-semibold text-white">
            {displayCount}
          </div>
        )}
        <Bell className="size-5 text-foreground" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="max-h-[500px] w-[320px] overflow-auto"
      >
        <NotificationsList />
      </PopoverContent>
    </Popover>
  );
}
