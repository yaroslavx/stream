"use client";

import { useCurrent } from "@/hooks/useCurrent";

export default function Home() {
  const { user, isLoadingProfile } = useCurrent();

  return <>{isLoadingProfile ? <div>Loading...</div> : JSON.stringify(user)}</>;
}
