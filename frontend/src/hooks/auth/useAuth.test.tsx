import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useAuth } from "./useAuth";

describe("useAuth", () => {
    it("AuthProvider配下の場合、Contextの値を返す", () => {
        const contextValue = {
            isAuthenticated: true,
            token: "test-token",
            login: vi.fn(),
            logout: vi.fn(),
            getToken: vi.fn(() => "test-token"),
        };

        const wrapper = ({ children }: { children: ReactNode }) => (
            <AuthContext.Provider value={contextValue} >
                {children}
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAuth(), {
            wrapper,
        });

        expect(result.current).toEqual(contextValue);
    });

    it("AuthProviderの外で使用した場合、エラーを投げる", () => {
        expect(() => {
            renderHook(() => useAuth());
        }).toThrow(
            "useAuth must be used within an AuthProvider"
        );
    });
});