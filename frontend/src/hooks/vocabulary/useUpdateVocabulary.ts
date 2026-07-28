import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateVocabulary } from "../../api/vocabulary";

export const useUpdateVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateVocabulary,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            })
        }
    });
}