import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateStudySession } from "./useUpdateStudySession";
import {
    updateStudySession,
    type updateStudySessionType,
} from "../../api/studySession";
import type { studySessionType } from "../../types/studySessionType";

vi.mock("../../api/studySession", () => ({
    updateStudySession: vi.fn(),
}));

describe("useUpdateStudySession", () => {
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

    const request: updateStudySessionType = {
        id: 1,
        updateStudySession: {
            date: "2026-08-17",
            category: "GRAMMAR",
            duration: 90,
            memo: "更新後",
        },
    };

    const response: studySessionType = {
        id: 1,
        date: "2026-08-17",
        category: "GRAMMAR",
        duration: 90,
        memo: "更新後",
    };

    it("学習記録更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updateStudySession).mockResolvedValue(response);

        const { result } = renderHook(
            () => useUpdateStudySession(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updateStudySession).toHaveBeenCalledWith(request);
        });
    });

    it("学習記録更新成功時、studySessionのキャッシュを無効化する", async () => {
        vi.mocked(updateStudySession).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdateStudySession(),
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

    it("学習記録更新失敗時、studySessionのキャッシュを無効化しない", async () => {
        vi.mocked(updateStudySession).mockRejectedValue(
            new Error("Failed to update study session")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdateStudySession(),
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