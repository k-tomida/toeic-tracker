import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateName, type UpdateNameRequest } from "../../api/user";

export const useUpdateName = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UpdateNameRequest) => updateName(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
        }
    })
}