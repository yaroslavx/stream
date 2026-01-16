import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SocialLinkItem } from "@/components/features/user/profile/social-links-form/SocialLinkItem";
import { Separator } from "@/components/ui/common/Separator";
import {
  useFindSocialLinksQuery,
  useReorderSocialLinksMutation,
} from "@/graphql/generated/output";

export function SocialLinksList() {
  const t = useTranslations("dashboard.settings.profile.socialLinks");

  const { data, refetch } = useFindSocialLinksQuery();

  const items = data?.findSocialLinks ?? [];

  const [socialLinks, setSocialLinks] = useState(items);

  useEffect(() => {
    setSocialLinks(items);
  }, [items]);

  const [reorder, { loading: isLoadingReorder }] =
    useReorderSocialLinksMutation({
      onCompleted() {
        refetch();
        toast.success(t("successReorderMessage"));
      },
      onError() {
        toast.error(t("errorReorderMessage"));
      },
    });

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(socialLinks);

    const [reorderItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderItem);

    const bulkUpdateData = items.map((socialLink, index) => ({
      id: socialLink.id,
      position: index,
    }));

    setSocialLinks(items);

    reorder({ variables: { list: bulkUpdateData } });
  }

  return socialLinks.length ? (
    <>
      <Separator />
      <div className="px-5 mt-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="socialLinks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {socialLinks.map((socialLink, index) => (
                  <Draggable
                    draggableId={socialLink.id}
                    key={socialLink.id}
                    index={index}
                    isDragDisabled={isLoadingReorder}
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
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  ) : null;
}
