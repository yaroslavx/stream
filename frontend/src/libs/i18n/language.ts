"use server";

import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  defaultLanguage,
  type Language,
} from "@/libs/i18n/config";

export async function getCurrentLanguage() {
  const cookiesStore = await cookies();

  return cookiesStore.get(COOKIE_NAME)?.value ?? defaultLanguage;
}

export async function setLanguage(language: Language) {
  const cookiesStore = await cookies();

  return cookiesStore.set(COOKIE_NAME, language);
}
