import { useTranslations } from "next-intl";
import { ChangeEmailForm } from "@/components/features/user/account/ChangeEmailForm";
import { ChangePasswordForm } from "@/components/features/user/account/ChangePasswordForm";
import { WrapperTOTP } from "@/components/features/user/account/totp/WrapperTOTP";
import { ChangeAvatarForm } from "@/components/features/user/profile/ChangeAvatarForm";
import { ChangeInfoForm } from "@/components/features/user/profile/ChangeInfoForm";
import { SocialLinksForm } from "@/components/features/user/profile/social-links-form/SocialLinksForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/common/Tabs";
import { Heading } from "@/components/ui/elements/Heading";

export function UserSettings() {
  const t = useTranslations("dashboard.settings");

  return (
    <div className="lg:px-10">
      <Heading
        title={t("header.heading")}
        description={t("header.description")}
        size="lg"
      />
      <Tabs defaultValue="profile" className="mt-3 w-full">
        <TabsList className="grid max-w-2xl grid-cols-5">
          <TabsTrigger value="profile">{t("header.profile")}</TabsTrigger>
          <TabsTrigger value="account">{t("header.account")}</TabsTrigger>
          <TabsTrigger value="appearance">{t("header.appearance")}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t("header.notifications")}
          </TabsTrigger>
          <TabsTrigger value="sessions">{t("header.sessions")}</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-5 space-y-6">
            <Heading
              title={t("profile.header.heading")}
              description={t("profile.header.description")}
            />
            <ChangeAvatarForm />
            <ChangeInfoForm />
            <SocialLinksForm />
          </div>
        </TabsContent>
        <TabsContent value="account">
          <div className={"mt-5 space-y-6"}>
            <Heading
              title={t("account.header.heading")}
              description={t("account.header.description")}
            />
            <ChangeEmailForm />
            <ChangePasswordForm />
            <Heading
              title={t("account.header.securityHeading")}
              description={t("account.header.securityDescription")}
            />
            <WrapperTOTP />
          </div>
        </TabsContent>
        <TabsContent value="appearance">Внешний вид</TabsContent>
        <TabsContent value="notifications">Уведомления</TabsContent>
        <TabsContent value="sessions">Сессии</TabsContent>
      </Tabs>
    </div>
  );
}
