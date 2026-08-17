import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateName } from "./useUpdateName";
import {
    updateName,
    type UpdateNameRequest,
} from "../../api/user";
import type { UserType } from "../../types/userType";

vi.mock("../../api/user", () => ({
    updateName: vi.fn(),
}));

describe("useUpdateName", () => {
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

    const request: UpdateNameRequest = {
        name: "テストユーザー",
    };

    const response: UserType = {
        id: 1,
        name: "テストユーザー",
        email: "test@example.com",
        password: "password123",
        targetScore: 800,
        nextExamDate: "2026-12-01",
    };

    it("名前更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updateName).mockResolvedValue(response);

        const { result } = renderHook(() => useUpdateName(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updateName).toHaveBeenCalledWith(request);
        });
    });

    it("名前更新成功時、userのキャッシュを無効化する", async () => {
        vi.mocked(updateName).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateName(), {
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

    it("名前更新失敗時、userのキャッシュを無効化しない", async () => {
        vi.mocked(updateName).mockRejectedValue(
            new Error("Failed to update name")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateName(), {
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