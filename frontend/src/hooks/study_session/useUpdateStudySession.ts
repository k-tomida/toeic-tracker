import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudySession } from "../../api/studySession";

export const useUpdateStudySession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStudySession,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studySession"],
            });
        }
    })
}