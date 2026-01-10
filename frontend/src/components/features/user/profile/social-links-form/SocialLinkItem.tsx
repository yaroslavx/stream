import { DraggableProvided } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/common/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Separator } from "@/components/ui/common/Separator";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";
import {
  FindSocialLinksQuery,
  useFindSocialLinksQuery,
} from "@/graphql/generated/output";
import {
  socialLinksSchema,
  TypeSocialLinksSchema,
} from "@/schemas/user/social-links.schema";

interface SocialLinkItemProps {
  socialLink: FindSocialLinksQuery["findSocialLinks"][0];
  provided: DraggableProvided;
}

export function SocialLinkItem({ provided, socialLink }: SocialLinkItemProps) {
  const t = useTranslations("dashboard.settings.profile.socialLinks.editForm");

  const [editingId, setEditingId] = useState<string | null>(null);

  const { refetch } = useFindSocialLinksQuery();

  const form = useForm<TypeSocialLinksSchema>({
    resolver: zodResolver(socialLinksSchema),
    values: {
      title: socialLink.title ?? "",
      url: socialLink.url ?? "",
    },
  });

  const { isValid, isDirty } = form.formState;

  function toggleEditing(id: string | null) {
    setEditingId(id);
  }

  function onSubmit(data: TypeSocialLinksSchema) {}

  return (
    <div
      className="mb-4 flex items-center gap-x-2 rounded-md
  border border-border bg-background text-sm"
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div
        className="rounded-l-md border-r border-r-border px-2 py-9
      text-foreground transition"
        {...provided.draggableProps}
      >
        <GripVertical className="size-5" />
      </div>
      <div className="space-y-1 px-2">
        {editingId === socialLink.id ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-x-6"
            >
              <div className="w-96 space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="YouTube"
                          className="h-8"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="https://youtube.com"
                          className="h-8"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-x-4">
                <Button
                  variant={"secondary"}
                  onClick={() => toggleEditing(null)}
                >
                  {t("cancelButton")}
                </Button>
                <Button>{t("submitButton")}</Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <h2 className={"font-semibold text-foreground"}>
              {socialLink.title}
            </h2>
            <p className={"text-muted-foreground"}>{socialLink.url}</p>
          </>
        )}
      </div>
      <div className={"ml-auto flex gap-x-2 items-center pr-4"}>
        {editingId !== socialLink.id && (
          <Button
            onClick={() => toggleEditing(socialLink.id)}
            variant="ghost"
            size={"icon"}
          >
            <Pencil className={"size-4 text-muted-foreground"} />
          </Button>
        )}
        <Button variant="ghost" size={"icon"}>
          <Trash2 className={"size-4 text-muted-foreground"} />
        </Button>
      </div>
    </div>
  );
}
