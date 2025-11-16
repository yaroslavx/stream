import {AvatarFallback} from "@radix-ui/react-avatar";
import { cva, VariantProps } from "class-variance-authority";
import {Avatar, AvatarImage} from "@/components/ui/common/Avatar";
import { FindProfileQuery } from "@/graphql/generated/output";
import { cn } from "@/utils/tw-merge";

const avatarSizes = cva("", {
  variants: {
    size: {
      sm: "size-7",
      default: "size-9",
      lg: "size-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
  channel: Pick<FindProfileQuery["findProfile"], "username" | "avatar">;
  isLive?: boolean;
}

export function ChannelAvatar({ size, channel, isLive }: ChannelAvatarProps) {
  return (
    <div className="relative">
      <Avatar
        className={cn(avatarSizes({ size }), isLive && "ring-2 ring-rose-500")}
      >
          <AvatarImage src={} className='object-cover'/>
          <AvatarFallback>
              {channel.username[0]}
          </AvatarFallback>
      </Avatar>
    </div>
  );
}
