import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useCreateVocabulary } from "./useCreateVocabulary";
import { postVocabulary } from "../../api/vocabulary";
import type { vocabularyType, } from "../../types/vocabularyType";
import type { vocabularyFormType } from "../../types/vocabularyFormType";

vi.mock("../../api/vocabulary", () => ({
    postVocabulary: vi.fn(),
}));

describe("useCreateVocabulary", () => {
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

    const request: vocabularyFormType = {
        word: "people",
        wordClass: "NOUN",
        meaning: "人々",
        status: "UNACQUIRED",
        memo: "頻出単語",
    };

    const response: vocabularyType = {
        id: 1,
        word: "people",
        wordClass: "NOUN",
        meaning: "人々",
        status: "UNACQUIRED",
        createdAt: "2026-08-17",
        memo: "頻出単語",
    };

    it("単語登録APIを正しいデータで呼び出す", async () => {
        vi.mocked(postVocabulary).mockResolvedValue(response);

        const { result } = renderHook(
            () => useCreateVocabulary(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(postVocabulary).toHaveBeenCalledWith(request);
        });
    });

    it("単語登録成功時、vocabularyのキャッシュを無効化する", async () => {
        vi.mocked(postVocabulary).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useCreateVocabulary(),
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

    it("単語登録失敗時、vocabularyのキャッシュを無効化しない", async () => {
        vi.mocked(postVocabulary).mockRejectedValue(
            new Error("Failed to create vocabulary")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useCreateVocabulary(),
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