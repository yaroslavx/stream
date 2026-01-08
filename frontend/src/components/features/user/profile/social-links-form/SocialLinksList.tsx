import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SocialLinkItem } from "@/components/features/user/profile/social-links-form/SocialLinkItem";
import { Separator } from "@/components/ui/common/Separator";
import { useFindSocialLinksQuery } from "@/graphql/generated/output";

export function SocialLinksList() {
  const t = useTranslations("dashboard.setting.profile.socialLinks");

  const { data, refetch } = useFindSocialLinksQuery();

  const items = data?.findSocialLinks ?? [];

  const [socialLinks, setSocialLinks] = useState(items);

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(socialLinks);

    const [reorderItem] = items.slice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderItem);

    const bulkUpdateData = items.map((socialLink, index) => ({
      id: socialLink.id,
      position: index,
    }));

    setSocialLinks(items);
  }

  return socialLinks.length ? (
    <>
      <Separator />
      <div className="px-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="socialLinks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {socialLinks.map((socialLink, index) => (
                  <Draggable
                    draggableId={socialLink.id}
                    key={socialLink.id}
                    index={index}
                    // isDragDisabled={}
                  >
                    {(provided) => (
                      <SocialLinkItem
                        provided={provided}
                        socialLink={socialLink}
                        key={socialLink.id}
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  ) : null;
}
