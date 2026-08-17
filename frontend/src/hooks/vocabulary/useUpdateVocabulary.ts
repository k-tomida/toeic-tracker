import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateVocabulary, type updateVocabularyType } from "../../api/vocabulary";

export const useUpdateVocabulary = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: updateVocabularyType) => updateVocabulary(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["vocabulary"],
            })
        }
    });
}