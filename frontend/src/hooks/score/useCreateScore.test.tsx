import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useCreateScore } from "./useCreateScore";
import { postScore } from "../../api/score";
import type { scoreFormType } from "../../types/scoreFormType";
import type { scoreType } from "../../types/scoreType";

vi.mock("../../api/score", () => ({
    postScore: vi.fn(),
}));

describe("useCreateScore", () => {
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

    const request: scoreFormType = {
        examDate: "2026-08-17",
        listeningScore: 400,
        readingScore: 350,
        memo: "TOEIC公開テスト",
    };

    const response: scoreType = {
        id: 1,
        examDate: "2026-08-17",
        totalScore: 750,
        listeningScore: 400,
        readingScore: 350,
        memo: "TOEIC公開テスト",
    };

    it("スコア登録APIを正しいデータで呼び出す", async () => {
        vi.mocked(postScore).mockResolvedValue(response);

        const { result } = renderHook(() => useCreateScore(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(postScore).toHaveBeenCalledWith(request);
        });
    });

    it("スコア登録成功時、scoreのキャッシュを無効化する", async () => {
        vi.mocked(postScore).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useCreateScore(), {
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

    it("スコア登録失敗時、scoreのキャッシュを無効化しない", async () => {
        vi.mocked(postScore).mockRejectedValue(
            new Error("Failed to create score")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(() => useCreateScore(), {
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