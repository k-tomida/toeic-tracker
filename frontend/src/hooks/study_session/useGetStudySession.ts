import { useQuery } from "@tanstack/react-query"
import { getStudySession } from "../../api/studySession"

export const useGetStudySession = () => {
    return useQuery({
        queryKey: ["studySession"],
        queryFn: () => getStudySession()
    });
};