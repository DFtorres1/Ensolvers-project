import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "src/shared/utils/api";

const postRegister = async (user: User) => {
  const { data } = await api.post("/auth/register", user);
  return data;
};

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) => postRegister(user),
    onError: (err) => {
      console.error(err);
      return navigate("/register");
    },
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export default useRegister;
