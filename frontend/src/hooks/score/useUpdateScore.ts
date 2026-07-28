import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScore } from "../../api/score";

export const useUpdateScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateScore,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["score"],
            });
        }
    })
}