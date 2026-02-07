import { Button } from "@/components/ui/common/Button";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";
import { useDisableTotpMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function DisableTotp() {
  const t = useTranslations("dashboard.settings.account.twoFactor.disable");

  const { refetch } = useCurrent();

  const [disableTotp, { loading: isDisableTotpLoading }] = useDisableTotpMutation({
    onCompleted: () => {
      refetch();
      toast.success(t("successMessage"));
    },
    onError: () => {
      toast.error(t("errorMessage"));
    },
  });

  return <ConfirmModal heading={t("heading")} message={t("message")} onConfirm={() => disableTotp()}>
    <Button variant="secondary" disabled={isDisableTotpLoading}>{t("trigger")}</Button>
  </ConfirmModal>;
}
