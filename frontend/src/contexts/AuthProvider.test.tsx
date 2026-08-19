import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "../hooks/auth/useAuth";

const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{ children } </AuthProvider>
);

describe("AuthProvider", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("localStorageにtokenがない場合、未認証状態になる", () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        expect(result.current.token).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });

    it("localStorageにtokenがある場合、認証済み状態になる", () => {
        localStorage.setItem("token", "test-token");

        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        expect(result.current.token).toBe("test-token");
        expect(result.current.isAuthenticated).toBe(true);
    });

    it("loginするとtokenを保存して認証済み状態になる", () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        act(() => {
            result.current.login("new-token");
        });

        expect(localStorage.getItem("token")).toBe("new-token");
        expect(result.current.token).toBe("new-token");
        expect(result.current.isAuthenticated).toBe(true);
    });

    it("logoutするとtokenを削除して未認証状態になる", () => {
        localStorage.setItem("token", "test-token");

        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        act(() => {
            result.current.logout();
        });

        expect(localStorage.getItem("token")).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
    });

    it("getTokenで現在のtokenを取得できる", () => {
        localStorage.setItem("token", "test-token");

        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        expect(result.current.getToken()).toBe("test-token");
    });

    it("login後、getTokenで更新後のtokenを取得できる", () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        act(() => {
            result.current.login("new-token");
        });

        expect(result.current.getToken()).toBe("new-token");
    });
});