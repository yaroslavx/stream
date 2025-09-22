"use client";

import { AuthWrapper } from "@/components/features/auth/AuthWrapper";

export default function CreateAccountForm() {
  return (
    <AuthWrapper
      heading="Регистрация"
      backButtonLabel="Есть учетная запись? Войти"
      backButtonHref="/account/login"
    >
      CreateAccountForm
    </AuthWrapper>
  );
}
