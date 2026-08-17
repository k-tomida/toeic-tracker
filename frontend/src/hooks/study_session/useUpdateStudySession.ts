import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudySession, type updateStudySessionType } from "../../api/studySession";

export const useUpdateStudySession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: updateStudySessionType) => updateStudySession(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studySession"],
            });
        }
    })
}