import { selectAuthUser } from "../features/auth/selector";
import { useAppSelector } from "./stateHooks";

export const useAuth = () => {
  const { user, loading } = useAppSelector(selectAuthUser);

  return {
    loading,
    isAuthenticated: !!user?.firebase_uid,
    user,
  };
};
