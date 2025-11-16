import { useEffect } from "react";
import {
  useClearSessionCookieMutation,
  useFindProfileQuery,
} from "@/graphql/generated/output";
import { useAuth } from "@/hooks/useAuth";

export function useCurrent() {
  const { isAuthenticated, exit } = useAuth();

  const { data, loading, refetch, error } = useFindProfileQuery({
    skip: !isAuthenticated,
  });

  const [clear] = useClearSessionCookieMutation();

  useEffect(() => {
    if (error) {
      if (isAuthenticated) {
        clear();
      }
      exit();
    }
  }, [isAuthenticated, clear, exit, error]);

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}
