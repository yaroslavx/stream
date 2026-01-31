import { Button } from "@/components/ui/common/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/common/Dialog";
import { Form } from "@/components/ui/common/Form";
import { useGenerateTotpSecretQuery } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import { enableTotpSchema, TypeEnableTotpSchema } from "@/schemas/user/enable-totp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export function EnableTotp() {
  const t = useTranslations("dashboard.settings.account.twoFactor.enable");

  const { refetch } = useCurrent();

  const { data, loading } = useGenerateTotpSecretQuery()

  const twoFactorAuth = data?.generateTotpSecret;

  const form = useForm<TypeEnableTotpSchema>({
    resolver: zodResolver(enableTotpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeEnableTotpSchema) {
  }

  return <Dialog>
    <DialogTrigger asChild>
      <Button>{t("trigger")}</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{t("heading")}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className='text-sm text-muted-foreground'>{twoFactorAuth?.qrcodeUrl ? t("qrInstructions") : ''}</span>
            <img src={twoFactorAuth?.qrcodeUrl} alt="QR Code" className="rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground text-center">{twoFactorAuth?.secret ? t("secretCodeLabel") + twoFactorAuth?.secret : ''}</span>
          </div>

        </form>
      </Form>
    </DialogContent>
  </Dialog>;
}
