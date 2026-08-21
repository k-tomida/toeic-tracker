import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useGetUser } from "./useGetUser";
import { getUser } from "../../api/user";
import type { UserType } from "../../types/userType";

vi.mock("../../api/user", () => ({
    getUser: vi.fn(),
}));

describe("useUser", () => {
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

    it("ユーザー取得APIを呼び出す", async () => {
        const response: UserType = {
            id: 1,
            name: "テストユーザー",
            email: "test@example.com",
            targetScore: 800,
            nextExamDate: "2026-12-01",
        };

        vi.mocked(getUser).mockResolvedValue(response);

        renderHook(() => useGetUser(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(getUser).toHaveBeenCalledTimes(1);
        });
    });

    it("ユーザー取得成功時、取得したデータを返す", async () => {
        const response: UserType = {
            id: 1,
            name: "テストユーザー",
            email: "test@example.com",
            targetScore: 800,
            nextExamDate: "2026-12-01",
        };

        vi.mocked(getUser).mockResolvedValue(response);

        const { result } = renderHook(() => useGetUser(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toEqual(response);
    });

    it("ユーザー取得失敗時、エラー状態になる", async () => {
        vi.mocked(getUser).mockRejectedValue(
            new Error("Failed to get user")
        );

        const { result } = renderHook(() => useGetUser(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
    });
});