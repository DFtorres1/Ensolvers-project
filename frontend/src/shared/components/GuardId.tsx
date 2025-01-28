import { Navigate } from "react-router-dom";
import { isValidToken } from "../utils/functions";

const GuardId: GuardIdProps =
  () =>
  ({ children }) => {
    if (!isValidToken()) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

export default GuardId;
