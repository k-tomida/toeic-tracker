import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useGetScore } from "./useGetScore";
import { getScore } from "../../api/score";
import type { scoreType } from "../../types/scoreType";

vi.mock("../../api/score", () => ({
    getScore: vi.fn(),
}));

describe("useGetScore", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        return ({ children }: { children: ReactNode }) => (
            <QueryClientProvider client= { queryClient } >
            { children }
            </QueryClientProvider>
        );
    };

beforeEach(() => {
    vi.clearAllMocks();
});

it("スコア取得APIを呼び出す", async () => {
    vi.mocked(getScore).mockResolvedValue([]);

    renderHook(() => useGetScore(), {
        wrapper: createWrapper(),
    });

    await waitFor(() => {
        expect(getScore).toHaveBeenCalledTimes(1);
    });
});

it("スコア取得成功時、取得したデータを返す", async () => {
    const response: scoreType[] = [
        {
            id: 1,
            examDate: "2026-08-17",
            totalScore: 750,
            listeningScore: 400,
            readingScore: 350,
            memo: "TOEIC公開テスト",
        },
        {
            id: 2,
            examDate: "2026-07-20",
            totalScore: 700,
            listeningScore: 380,
            readingScore: 320,
            memo: "",
        },
    ];

    vi.mocked(getScore).mockResolvedValue(response);

    const { result } = renderHook(() => useGetScore(), {
        wrapper: createWrapper(),
    });

    await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(response);
});

it("スコア取得失敗時、エラー状態になる", async () => {
    vi.mocked(getScore).mockRejectedValue(
        new Error("Failed to get score")
    );

    const { result } = renderHook(() => useGetScore(), {
        wrapper: createWrapper(),
    });

    await waitFor(() => {
        expect(result.current.isError).toBe(true);
    });
});
});