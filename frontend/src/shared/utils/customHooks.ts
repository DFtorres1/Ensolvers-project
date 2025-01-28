import { useEffect } from "react";
import { getDecodedToken } from "./functions";
import { useAuth } from "src/UserProvider";

export const useValidateContext = () => {
  const auth = useAuth();
  useEffect(() => {
    const token = getDecodedToken();

    const localUserId = token?.userId;
    if (localUserId) {
      auth?.setUserIds(localUserId);
    }
  }, [auth]);
};
