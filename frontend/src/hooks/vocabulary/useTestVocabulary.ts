import { useMutation, useQueryClient } from "@tanstack/react-query"
import { testVocabulary } from "../../api/vocabulary"
import type { sendTestType } from "../../types/vocabularyType";

export const useTestVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: sendTestType[]) => testVocabulary(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            })
        }
    })
}