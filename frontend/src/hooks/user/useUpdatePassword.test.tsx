import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useUpdatePassword } from "./useUpdatePassword";
import {
    updatePassword,
    type UpdatePasswordRequest,
} from "../../api/user";
import { useAuth } from "../auth/useAuth";

vi.mock("../../api/user", () => ({
    updatePassword: vi.fn(),
}));

vi.mock("../auth/useAuth", () => ({
    useAuth: vi.fn(),
}));

describe("useUpdatePassword", () => {
    let queryClient: QueryClient;

    const loginContextMock = vi.fn();

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

        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: true,
            token: "old-token",
            login: loginContextMock,
            logout: vi.fn(),
            getToken: vi.fn(() => "old-token"),
        });
    });

    const request: UpdatePasswordRequest = {
        currentPassword: "oldPassword123",
        newPassword: "newPassword123",
        confirmPassword: "newPassword123",
    };

    it("パスワード更新APIを正しいデータで呼び出す", async () => {
        vi.mocked(updatePassword).mockResolvedValue("new-token");

        const { result } = renderHook(
            () => useUpdatePassword(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(updatePassword).toHaveBeenCalledWith(request);
        });
    });

    it("パスワード更新成功時、新しいtokenをAuthContextに保存する", async () => {
        vi.mocked(updatePassword).mockResolvedValue("new-token");

        const { result } = renderHook(
            () => useUpdatePassword(),
            {
                wrapper: createWrapper(),
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(loginContextMock).toHaveBeenCalledWith(
                "new-token"
            );
        });
    });

    it("パスワード更新成功時、userのキャッシュを無効化する", async () => {
        vi.mocked(updatePassword).mockResolvedValue("new-token");

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdatePassword(),
            {
                wrapper,
            }
        );

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({
                queryKey: ["user"],
            });
        });
    });

    it("パスワード更新失敗時、認証情報とキャッシュを更新しない", async () => {
        vi.mocked(updatePassword).mockRejectedValue(
            new Error("Failed to update password")
        );

        const wrapper = createWrapper();

        const invalidateSpy = vi.spyOn(
            queryClient,
            "invalidateQueries"
        );

        const { result } = renderHook(
            () => useUpdatePassword(),
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

        expect(loginContextMock).not.toHaveBeenCalled();
        expect(invalidateSpy).not.toHaveBeenCalled();
    });
});