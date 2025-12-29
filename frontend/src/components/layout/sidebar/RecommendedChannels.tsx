"use client";

import { useTranslations } from "next-intl";
import {ChannelItem, ChannelItemSkeleton} from "@/components/layout/sidebar/ChannelItem";
import { Separator } from "@/components/ui/common/Separator";
import { useFindRecommendedChannelsQuery } from "@/graphql/generated/output";
import { useSidebar } from "@/hooks/useSidebar";

export function RecommendedChannels() {
  const t = useTranslations("layout.sidebar.recommended");

  const { isCollapsed } = useSidebar();

  const { data, loading: isLoadingRecommended } =
    useFindRecommendedChannelsQuery();
  const channels = data?.findRecommendedChannels ?? [];

  return (
    <div>
      <Separator className="mb-3" />
      {!isCollapsed && (
        <h2 className="text-lg mb-2 px-2 font-semibold text-foreground">
          {t("heading")}
        </h2>
      )}
      {isLoadingRecommended ? (
        Array.from({length: 7}).map(() => <ChannelItemSkeleton/>)
      ) : (
        channels.map((channel) => (
          <ChannelItem channel={channel} key={channel.username} />
        ))
      )}
    </div>
  );
}
