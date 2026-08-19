import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScore, type updateScoreType } from "../../api/score";

export const useUpdateScore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: updateScoreType) => updateScore(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["score"],
            });
        },
    });
};