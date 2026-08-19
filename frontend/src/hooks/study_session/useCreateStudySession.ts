import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStudySession } from "../../api/studySession";
import type { studySessionFormType } from "../../types/studySessionFormType";

export const useCreateStudySession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: studySessionFormType) => postStudySession(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studySession"],
            });
        },
    });
};