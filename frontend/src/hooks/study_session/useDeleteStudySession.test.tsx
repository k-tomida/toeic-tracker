import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useDeleteStudySession } from "./useDeleteStudySession";
import { deleteStudySession } from "../../api/studySession";

vi.mock("../../api/studySession", () => ({
    deleteStudySession: vi.fn(),
}));

describe("useDeleteStudySession", () => {
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

    it("学習記録削除APIを正しいIDで呼び出す", async () => {
        vi.mocked(deleteStudySession).mockResolvedValue(undefined);

        const { result } = renderHook(
            () => useDeleteStudySession(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(deleteStudySession).toHaveBeenCalledWith(1);
        });
    });

    it("学習記録削除成功時、studySessionのキャッシュを無効化する", async () => {
        vi.mocked(deleteStudySession).mockResolvedValue(undefined);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useDeleteStudySession(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["studySession"],
            });
        });
    });

    it("学習記録削除失敗時、studySessionのキャッシュを無効化しない", async () => {
        vi.mocked(deleteStudySession).mockRejectedValue(
            new Error("Failed to delete study session")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useDeleteStudySession(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(invalidateSpy).not.toHaveBeenCalled();
    });
});