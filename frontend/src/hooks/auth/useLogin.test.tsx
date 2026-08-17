import { describe, expect, it, vi, beforeEach } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLogin } from "./useLogin";
import { login } from "../../api/user";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";

vi.mock("../../api/user", () => ({
    login: vi.fn(),
}));

vi.mock("./useAuth", () => ({
    useAuth: vi.fn(),
}));

vi.mock("react-router", () => ({
    useNavigate: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
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

describe("useLogin", () => {
    const loginContextMock = vi.fn();
    const navigateMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useAuth).mockReturnValue({
            isAuthenticated: false,
            token: null,
            login: loginContextMock,
            logout: vi.fn(),
            getToken: vi.fn(() => null),
        });

        vi.mocked(useNavigate).mockReturnValue(navigateMock);
    });

    it("ログインAPIを正しいデータで呼び出す", async () => {
        vi.mocked(login).mockResolvedValue("test-token");

        const { result } = renderHook(() => useLogin(), {
            wrapper: createWrapper(),
        });

        const request = {
            email: "test@example.com",
            password: "password123",
        };

        act(() => {
            result.current.mutate(request);
        });

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith(request);
        });
    });

    it("ログイン成功時、tokenをAuthContextに保存する", async () => {
        vi.mocked(login).mockResolvedValue("test-token");

        const { result } = renderHook(() => useLogin(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate({
                email: "test@example.com",
                password: "password123",
            });
        });

        await waitFor(() => {
            expect(loginContextMock).toHaveBeenCalledWith("test-token");
        });
    });

    it("ログイン成功時、ダッシュボードへ遷移する", async () => {
        vi.mocked(login).mockResolvedValue("test-token");

        const { result } = renderHook(() => useLogin(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate({
                email: "test@example.com",
                password: "password123",
            });
        });

        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith("/dash-board");
        });
    });

    it("ログイン失敗時、認証処理と画面遷移を行わない", async () => {
        vi.mocked(login).mockRejectedValue(new Error("login failed"));

        const { result } = renderHook(() => useLogin(), {
            wrapper: createWrapper(),
        });

        act(() => {
            result.current.mutate({
                email: "test@example.com",
                password: "wrong-password",
            });
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(loginContextMock).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();
    });
});