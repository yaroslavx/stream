"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Logo() {
  const t = useTranslations("layout.header.logo");
  return (
    <Link
      href="/"
      className="flex items-center gap-x-4 transition-opacity hover:opacity-75"
    >
      <Image src="/images/logo.svg" alt="Stream" width={35} height={35} />
      <div className="hidden lg:block leading-tight">
        <h2 className="text-lg font-semibold tracking-wider text-accent-foreground">
          Stream
        </h2>
        <p className="text-sm text-muted-foreground">{t("platform")}</p>
      </div>
    </Link>
  );
}
