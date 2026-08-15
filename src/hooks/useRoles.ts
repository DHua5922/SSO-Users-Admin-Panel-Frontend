import { useQuery } from "@tanstack/react-query";
import { getAllRolesApi } from "../api/role.ts";

export default function useRoles() {
  const {
    isPending,
    data: roles,
    isError,
    error,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRolesApi,
    retry: false,
  });

  return {
    isLoading: isPending,
    list: roles || [],
    isError: isError,
    errorMessage: error?.message,
  };
}
