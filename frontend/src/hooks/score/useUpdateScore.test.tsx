import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateScore } from "./useUpdateScore";
import { updateScore, type updateScoreType } from "../../api/score";
import type { scoreType } from "../../types/scoreType";

vi.mock("../../api/score", () => ({
    updateScore: vi.fn(),
}));

describe("useUpdateScore", () => {
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

    const request: updateScoreType = {
        id: 1,
        updateScore: {
            examDate: "2026-08-17",
            listeningScore: 420,
            readingScore: 360,
            memo: "更新後",
        },
    };

    const response: scoreType = {
        id: 1,
        examDate: "2026-08-17",
        totalScore: 780,
        listeningScore: 420,
        readingScore: 360,
        memo: "更新後",
    };

    it("スコア更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updateScore).mockResolvedValue(response);

        const { result } = renderHook(() => useUpdateScore(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updateScore).toHaveBeenCalledWith(request);
        });
    });

    it("スコア更新成功時、scoreのキャッシュを無効化する", async () => {
        vi.mocked(updateScore).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateScore(), {
            wrapper,
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["score"],
            });
        });
    });

    it("スコア更新失敗時、scoreのキャッシュを無効化しない", async () => {
        vi.mocked(updateScore).mockRejectedValue(
            new Error("Failed to update score")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useUpdateScore(), {
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