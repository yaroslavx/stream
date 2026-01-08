import { DraggableProvided } from "@hello-pangea/dnd";
import { FindSocialLinksQuery } from "@/graphql/generated/output";

interface SocialLinkItemProps {
  socialLink: FindSocialLinksQuery["findSocialLinks"][0];
  provided: DraggableProvided;
}

export function SocialLinkItem({ provided, socialLink }: SocialLinkItemProps) {
  return <div></div>;
}
