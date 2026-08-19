import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useGetVocabulary } from "./useGetVocabulary";
import { getVocabulary } from "../../api/vocabulary";
import type { vocabularyType } from "../../types/vocabularyType";

vi.mock("../../api/vocabulary", () => ({
    getVocabulary: vi.fn(),
}));

describe("useGetVocabulary", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
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

    it("単語取得APIを呼び出す", async () => {
        vi.mocked(getVocabulary).mockResolvedValue([]);

        renderHook(() => useGetVocabulary(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(getVocabulary).toHaveBeenCalledTimes(1);
        });
    });

    it("単語取得成功時、取得したデータを返す", async () => {
        const response: vocabularyType[] = [
            {
                id: 1,
                word: "people",
                wordClass: "NOUN",
                meaning: "人々",
                status: "UNACQUIRED",
                createdAt: "2026-08-17",
                memo: "頻出単語",
            },
            {
                id: 2,
                word: "develop",
                wordClass: "VERB",
                meaning: "発展させる",
                status: "ACQUIRED",
                createdAt: "2026-08-16",
                memo: "",
            },
        ];

        vi.mocked(getVocabulary).mockResolvedValue(response);

        const { result } = renderHook(() => useGetVocabulary(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(response);
    });

    it("単語取得失敗時、エラー状態になる", async () => {
        vi.mocked(getVocabulary).mockRejectedValue(
            new Error("Failed to get vocabulary")
        );

        const { result } = renderHook(() => useGetVocabulary(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
    });
});