import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useGetStudySession } from "./useGetStudySession";
import { getStudySession } from "../../api/studySession";
import type { studySessionType } from "../../types/studySessionType";

vi.mock("../../api/studySession", () => ({
    getStudySession: vi.fn(),
}));

describe("useStudySession", () => {
    const createWrapper = () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
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

    it("学習記録取得APIを呼び出す", async () => {
        vi.mocked(getStudySession).mockResolvedValue([]);

        renderHook(() => useGetStudySession(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(getStudySession).toHaveBeenCalledTimes(1);
        });
    });

    it("学習記録取得成功時、取得したデータを返す", async () => {
        const response: studySessionType[] = [
            {
                id: 1,
                date: "2026-08-17",
                category: "GRAMMAR",
                duration: 60,
                memo: "文法問題集",
            },
            {
                id: 2,
                date: "2026-08-16",
                category: "VOCABULARY",
                duration: 30,
                memo: "単語学習",
            },
        ];

        vi.mocked(getStudySession).mockResolvedValue(response);

        const { result } = renderHook(() => useGetStudySession(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(response);
    });

    it("学習記録取得失敗時、エラー状態になる", async () => {
        vi.mocked(getStudySession).mockRejectedValue(
            new Error("Failed to get study sessions")
        );

        const { result } = renderHook(() => useGetStudySession(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
    });
});