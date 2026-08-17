import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdateVocabulary } from "./useUpdateVocabulary";
import {
    updateVocabulary,
    type updateVocabularyType,
} from "../../api/vocabulary";
import type { vocabularyType } from "../../types/vocabularyType";

vi.mock("../../api/vocabulary", () => ({
    updateVocabulary: vi.fn(),
}));

describe("useUpdateVocabulary", () => {
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

    const request: updateVocabularyType = {
        id: 1,
        updateVocabulary: {
            word: "develop",
            wordClass: "VERB",
            meaning: "発展させる",
            status: "ACQUIRED",
            memo: "更新後",
        },
    };

    const response: vocabularyType = {
        id: 1,
        word: "develop",
        wordClass: "VERB",
        meaning: "発展させる",
        status: "ACQUIRED",
        createdAt: "2026-08-17",
        memo: "更新後",
    };

    it("単語更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updateVocabulary).mockResolvedValue(response);

        const { result } = renderHook(
            () => useUpdateVocabulary(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updateVocabulary).toHaveBeenCalledWith(request);
        });
    });

    it("単語更新成功時、vocabularyのキャッシュを無効化する", async () => {
        vi.mocked(updateVocabulary).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdateVocabulary(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["vocabulary"],
            });
        });
    });

    it("単語更新失敗時、vocabularyのキャッシュを無効化しない", async () => {
        vi.mocked(updateVocabulary).mockRejectedValue(
            new Error("Failed to update vocabulary")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdateVocabulary(),
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