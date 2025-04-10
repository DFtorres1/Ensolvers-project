import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "src/shared/utils/api";
import { useAuth } from "src/UserProvider";

const postAuthentication = async (loginObject: LoginObjectModel) => {
  const { data } = await api.post("/auth/login", loginObject);
  return data;
};

const useAuthentication = () => {
  const currentUserId = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginObject: LoginObjectModel) =>
      postAuthentication(loginObject),
    onError: (err) => {
      console.error(err);
      return navigate("/login");
    },
    onSuccess: (data: { token: string }) => {
      const { token } = data;
      const decodedToken = jwtDecode<TokenType>(token);
      const localUserId = decodedToken.userId;
      if (localUserId) {
        currentUserId?.setUserIds(localUserId);
      }
      sessionStorage.setItem("token", token);
      navigate("/");
    },
  });
};

export default useAuthentication;
