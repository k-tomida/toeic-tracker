import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postVocabulary } from "../../api/vocabulary";

export const useCreateVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postVocabulary,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            });
        }
    })
}