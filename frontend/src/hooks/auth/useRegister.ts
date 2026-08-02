// hooks/queries/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { register, type RegisterRequest } from "../../api/user";
import { useAuth } from "./useAuth";

export const useRegister = () => {
    const { login: loginContext } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterRequest) => register(data),
        onSuccess: (data) => {
            loginContext(data);
            navigate("/dash-board");
        },
    });
};