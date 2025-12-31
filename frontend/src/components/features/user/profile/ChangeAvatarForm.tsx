"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/common/Form";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { ChannelAvatar } from "@/components/ui/elements/ChannelAvatar";
import { FormWrapper } from "@/components/ui/elements/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";
import {
  TypeUploadFileSchema,
  uploadFileSchema,
} from "@/schemas/upload-file.schema";
import { getMediaSource } from "@/utils/get-media-source";

export function ChangeAvatarForm() {
  const t = useTranslations("dashboard.setting.profile.avatar");

  const { user, isLoadingProfile, refetch } = useCurrent();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: getMediaSource(user?.avatar),
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return isLoadingProfile ? (
    <ChangeAvatarFormSkeleton />
  ) : (
    <FormWrapper heading={t("heading")}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="px-5 pb-5">
              <div className="w-full items-center lg:flex space-x-6">
                <ChannelAvatar
                  size="xl"
                  channel={{
                    username: user?.username!,
                    avatar:
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : field.value,
                  }}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      className="hidden"
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
    </FormWrapper>
  );
}

export function ChangeAvatarFormSkeleton() {
  return <Skeleton className="h-52 w-full" />;
}
