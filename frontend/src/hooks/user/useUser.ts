import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "../../api/user";

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(),
    });
};

export const useUserMutation=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        }
    })
}