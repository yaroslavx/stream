"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/common/Button";
import { useAuth } from "@/hooks/useAuth";

export function HeaderMenu() {
  const t = useTranslations("layout.headerMenu");

  const { isAuthenticated } = useAuth();

  return (
    <div className="ml-auto flex items-center gap-x-4">
      {isAuthenticated ? (
        <div></div>
      ) : (
        <>
          <Link href="/account/login">
            <Button variant="secondary">{t("login")}</Button>
          </Link>
          <Link href="/account/create">
            <Button>{t("register")}</Button>
          </Link>
        </>
      )}
    </div>
  );
}
