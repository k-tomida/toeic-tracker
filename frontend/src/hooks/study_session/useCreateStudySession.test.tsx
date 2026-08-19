import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useCreateStudySession } from "./useCreateStudySession";
import { postStudySession } from "../../api/studySession";
import type { studySessionType } from "../../types/studySessionType";
import type { studySessionFormType } from "../../types/studySessionFormType";

vi.mock("../../api/studySession", () => ({
    postStudySession: vi.fn(),
}));

describe("useCreateStudySession", () => {
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

    const request: studySessionFormType = {
        date: "2026-08-17",
        duration: 60,
        category: "GRAMMAR",
        memo: "文法問題集",
    };

    const response: studySessionType = {
        id: 1,
        date: "2026-08-17",
        duration: 60,
        category: "GRAMMAR",
        memo: "文法問題集",
    };

    it("学習記録登録APIを正しいデータで呼び出す", async () => {
        vi.mocked(postStudySession).mockResolvedValue(response);

        const { result } = renderHook(
            () => useCreateStudySession(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(postStudySession).toHaveBeenCalledWith(request);
        });
    });

    it("学習記録登録成功時、studySessionのキャッシュを無効化する", async () => {
        vi.mocked(postStudySession).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useCreateStudySession(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["studySession"],
            });
        });
    });

    it("学習記録登録失敗時、studySessionのキャッシュを無効化しない", async () => {
        vi.mocked(postStudySession).mockRejectedValue(
            new Error("Failed to create study session")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useCreateStudySession(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(invalidateSpy).not.toHaveBeenCalled();
    });
});