// hooks/queries/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login, type LoginRequest } from "../../api/user";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      loginContext(data);
      navigate("/dash-board");
    },
  });
};