import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postScore } from "../../api/score";
import type { scoreFormType } from "../../types/scoreFormType";

export const useCreateScore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: scoreFormType) => postScore(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["score"],
            });
        },
    });
};