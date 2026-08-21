import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateUser } from "./useUpdateUser";
import {
    updateUser,
    type UpdateUserRequest,
} from "../../api/user";
import type { UserType } from "../../types/userType";

vi.mock("../../api/user", () => ({
    updateUser: vi.fn(),
}));

describe("useUpdateUser", () => {
    let queryClient: QueryClient;

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
                mutations: {
                    retry: false,
                },
            },
        });

        return ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const request: UpdateUserRequest = {
        targetScore: 850,
        nextExamDate: "2026-12-01",
    };

    const response: UserType = {
        id: 1,
        name: "テストユーザー",
        email: "test@example.com",
        targetScore: 850,
        nextExamDate: "2026-12-01",
    };

    it("ユーザー情報更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updateUser).mockResolvedValue(response);

        const { result } = renderHook(() => useUpdateUser(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updateUser).toHaveBeenCalledWith(request);
        });
    });

    it("ユーザー情報更新成功時、userのキャッシュを無効化する", async () => {
        vi.mocked(updateUser).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateUser(), {
            wrapper,
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["user"],
            });
        });
    });

    it("ユーザー情報更新失敗時、userのキャッシュを無効化しない", async () => {
        vi.mocked(updateUser).mockRejectedValue(
            new Error("Failed to update user")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateUser(), {
            wrapper,
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(invalidateSpy).not.toHaveBeenCalled();
    });
});