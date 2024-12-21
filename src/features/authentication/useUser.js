import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };//in this code the following part work /**isAuthenticated: user?.role === "authenticated"**/when the user.role is equivalent with the "authenicated" then it become true the isAuthnticated value then based on that we can make the user ethir redirected to the home page or to the login page agin
}