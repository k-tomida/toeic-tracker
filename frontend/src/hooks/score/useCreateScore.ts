import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postScore } from "../../api/score";

export const useCreateScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postScore,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["score"],
            });
        }
    })
}