import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postVocabulary } from "../../api/vocabulary";
import type { vocabularyFormType } from "../../types/vocabularyFormType";

export const useCreateVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: vocabularyFormType) => postVocabulary(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            });
        }
    })
}