import { useQuery } from "@tanstack/react-query"
import { getVocabulary } from "../../api/vocabulary"

export const useGetVocabulary = () => {
    return useQuery({
        queryKey: ["vocabulary"],
        queryFn: getVocabulary
    });
}