import { useQuery } from "@tanstack/react-query"
import { getScore } from "../../api/score"

export const useGetScore = () => {
    return useQuery({
        queryKey: ["score"],
        queryFn: getScore
    })
}