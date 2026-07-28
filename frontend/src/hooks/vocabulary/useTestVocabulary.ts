import { useMutation, useQueryClient } from "@tanstack/react-query"
import { testVocabulary } from "../../api/vocabulary"

export const useTestVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: testVocabulary,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            })
        }
    })
}