import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useDeleteScore } from "./useDeleteScore";
import { deleteScore } from "../../api/score";

vi.mock("../../api/score", () => ({
    deleteScore: vi.fn(),
}));

describe("useDeleteScore", () => {
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
            <QueryClientProvider client={queryClient} >
                {children}
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("スコア削除APIを正しいIDで呼び出す", async () => {
        vi.mocked(deleteScore).mockResolvedValue(undefined);

        const { result } = renderHook(() => useDeleteScore(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(deleteScore).toHaveBeenCalledWith(1);
        });
    });

    it("スコア削除成功時、scoreのキャッシュを無効化する", async () => {
        vi.mocked(deleteScore).mockResolvedValue(undefined);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useDeleteScore(), {
            wrapper,
        });

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["score"],
            });
        });
    });

    it("スコア削除失敗時、scoreのキャッシュを無効化しない", async () => {
        vi.mocked(deleteScore).mockRejectedValue(
            new Error("Failed to delete score")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useDeleteScore(), {
            wrapper,
        });

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(invalidateSpy).not.toHaveBeenCalled();
    });
});