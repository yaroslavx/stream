"use client";

import { useTranslations } from "next-intl";
import { DisableTotp } from "@/components/features/user/account/totp/DisableTotp";
import { EnableTotp } from "@/components/features/user/account/totp/EnableTotp";
import { Skeleton } from "@/components/ui/common/Skeleton";
import { CardContainer } from "@/components/ui/elements/CardContainer";
import { useCurrent } from "@/hooks/useCurrent";

export function WrapperTOTP() {
  const t = useTranslations("dashboard.settings.account.twoFactor");

  const { user, isLoadingProfile } = useCurrent();

  return isLoadingProfile ? (
    <WrapperTOTPSkeleton />
  ) : (
    <CardContainer
      heading={t("heading")}
      description={t("description")}
      rightContent={<div className={"gap-x-4 flex items-center"}></div>}
    >
      {!user?.isTotpEnabled ? <EnableTotp /> : <DisableTotp />}
    </CardContainer>
  );
}

export function WrapperTOTPSkeleton() {
  return <Skeleton className={"w-full h-24"} />;
}
