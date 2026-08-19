import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudySession } from "../../api/studySession";

export const useDeleteStudySession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteStudySession(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studySession"],
            });
        }
    })
}