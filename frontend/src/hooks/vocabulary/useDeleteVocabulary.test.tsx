import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useDeleteVocabulary } from "./useDeleteVocabulary";
import { deleteVocabulary } from "../../api/vocabulary";

vi.mock("../../api/vocabulary", () => ({
    deleteVocabulary: vi.fn(),
}));

describe("useDeleteVocabulary", () => {
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

    it("単語削除APIを正しいIDで呼び出す", async () => {
        vi.mocked(deleteVocabulary).mockResolvedValue(undefined);

        const { result } = renderHook(
            () => useDeleteVocabulary(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(deleteVocabulary).toHaveBeenCalledWith(1);
        });
    });

    it("単語削除成功時、vocabularyのキャッシュを無効化する", async () => {
        vi.mocked(deleteVocabulary).mockResolvedValue(undefined);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useDeleteVocabulary(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["vocabulary"],
            });
        });
    });

    it("単語削除失敗時、vocabularyのキャッシュを無効化しない", async () => {
        vi.mocked(deleteVocabulary).mockRejectedValue(
            new Error("Failed to delete vocabulary")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useDeleteVocabulary(),
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