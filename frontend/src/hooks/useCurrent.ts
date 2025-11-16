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

  if (error) {
    if (isAuthenticated) {
      clear();
    }
    exit();
  }

  return {
    user: data?.findProfile,
    isLoadingProfile: loading,
    refetch,
  };
}
