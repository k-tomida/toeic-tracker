import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStudySession } from "../../api/studySession";

export const useCreateStudySession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postStudySession,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studySession"],
            });
        }
    })
}