import type { Metadata } from "next";
import CreateAccountForm from "@/components/features/auth/forms/CreateAccountForm";

export const metadata: Metadata = {
  title: "Создание аккаунта",
};

export default function CreateAccountPage() {
  return <CreateAccountForm />;
}
