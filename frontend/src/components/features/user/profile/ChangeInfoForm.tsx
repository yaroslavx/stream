"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ChangeAvatarFormSkeleton } from "@/components/features/user/profile/ChangeAvatarForm";
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
import { Skeleton } from "@/components/ui/common/Skeleton";
import { FormWrapper } from "@/components/ui/elements/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";
import {
  changeProfileInfoSchema,
  TypeChangeProfileInfoSchema,
} from "@/schemas/user/change-info.schema";

export function ChangeInfoForm() {
  const t = useTranslations("dashboard.setting.profile.info");

  const { user, isLoadingProfile, refetch } = useCurrent();

  const form = useForm<TypeChangeProfileInfoSchema>({
    resolver: zodResolver(changeProfileInfoSchema),
    values: {
      username: user?.username ?? "",
      displayName: user?.displayName ?? "",
      bio: user?.bio ?? "",
    },
  });

  const { isValid, isDirty } = form.formState;

  function onSubmit() {}

  return isLoadingProfile ? (
    <ChangeAvatarFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="px-5">
                <FormLabel>{t("usernameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("usernamePlaceholder")} {...field} />
                </FormControl>
                <FormDescription>{t("usernameDescription")}</FormDescription>
              </FormItem>
            )}
          />
          <Separator />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="px-5 pb-3">
                <FormLabel>{t("displayNameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("displayNamePlaceholder")} {...field} />
                </FormControl>
                <FormDescription>{t("displayNameDescription")}</FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormWrapper>
  );
}

export function ChangeInfoFormSkeleton() {
  return <Skeleton className="h-96 w-full" />;
}
