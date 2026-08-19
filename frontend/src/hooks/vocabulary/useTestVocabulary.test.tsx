import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useTestVocabulary } from "./useTestVocabulary";
import { testVocabulary } from "../../api/vocabulary";
import type {
    sendTestType,
    vocabularyType,
} from "../../types/vocabularyType";

vi.mock("../../api/vocabulary", () => ({
    testVocabulary: vi.fn(),
}));

describe("useTestVocabulary", () => {
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

    const request: sendTestType[] = [
        {
            id: 1,
            status: "ACQUIRED",
        },
        {
            id: 2,
            status: "UNACQUIRED",
        },
    ];

    const response: vocabularyType[] = [
        {
            id: 1,
            word: "people",
            wordClass: "NOUN",
            meaning: "人々",
            status: "ACQUIRED",
            createdAt: "2026-08-17",
            memo: "",
        },
        {
            id: 2,
            word: "develop",
            wordClass: "VERB",
            meaning: "発展させる",
            status: "UNACQUIRED",
            createdAt: "2026-08-17",
            memo: "",
        },
    ];

    it("単語テストAPIを正しいデータで呼び出す", async () => {
        vi.mocked(testVocabulary).mockResolvedValue(response);

        const { result } = renderHook(
            () => useTestVocabulary(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(testVocabulary).toHaveBeenCalledWith(request);
        });
    });

    it("単語テスト成功時、vocabularyのキャッシュを無効化する", async () => {
        vi.mocked(testVocabulary).mockResolvedValue(response);

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useTestVocabulary(),
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

    it("単語テスト失敗時、vocabularyのキャッシュを無効化しない", async () => {
        vi.mocked(testVocabulary).mockRejectedValue(
            new Error("Failed to test vocabulary")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useTestVocabulary(),
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