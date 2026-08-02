import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePassword, type UpdatePasswordRequest } from "../../api/user";
import { useAuth } from "../auth/useAuth";

export const useUpdatePassword = () => {
    const { login: loginContext } = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdatePasswordRequest) => updatePassword(data),
        onSuccess: (data) => {
            loginContext(data);
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        }
    })
}