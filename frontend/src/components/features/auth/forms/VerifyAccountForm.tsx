"use client";

import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthWrapper } from "@/components/features/auth/AuthWrapper";
import { useVerifyAccountMutation } from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";

export function VerifyAccountForm() {
  const t = useTranslations("auth.verify");

  const { auth } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [verify] = useVerifyAccountMutation({
    onCompleted() {
      auth();
      toast.error(t("successMessage"));
      router.push("/dashboard/settings");
    },
    onError() {
      toast.error(t("errorMessage"));
    },
  });

  useEffect(() => {
    verify({
      variables: {
        data: { token },
      },
    });
  }, [token]);

  return (
    <AuthWrapper heading={t("heading")}>
      <div className="flex justify-center">
        <Loader className="size-8 animate-spin" />
      </div>
    </AuthWrapper>
  );
}
