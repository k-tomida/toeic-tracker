import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScore } from "../../api/score";

export const useDeleteScore = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteScore(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["score"],
            });
        },
    });
};