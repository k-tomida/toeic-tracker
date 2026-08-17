import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, type UpdateUserRequest } from "../../api/user";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateUserRequest) => updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        }
    })
}