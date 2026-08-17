import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVocabulary } from "../../api/vocabulary";

export const useDeleteVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteVocabulary(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            })
        }
    });
}