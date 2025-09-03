import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/common/Button";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      <div className="text-amber-300 text-3xl font-bold underline">
        {t("title")}
      </div>
      <Button>Button</Button>
    </>
  );
}
