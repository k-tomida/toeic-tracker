// AccountMenu.tsx
import { PiPencil } from "react-icons/pi";
import { FaChevronDown, FaLock, FaChevronUp } from "react-icons/fa";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useGetUser } from "../hooks/user/useGetUser";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { ChangeNamePopUp } from "./ChangeNamePopUp";
import { ChangePasswordPopUp } from "./ChangePasswordPopUp";
import { ClipLoader } from "react-spinners";

export const AccountMenu = () => {
    const { data, isPending, isError } = useGetUser();
    const { logout } = useAuth();
    const [pulldown, setPulldown] = useState(false);
    const [namePopUpOpen, setNamePopUpOpen] = useState(false);
    const [passwordPopUpOpen, setPasswordPopUpOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pulldown) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setPulldown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [pulldown]);

    return (
        <div className="relative w-60" ref={menuRef}>
            {/* トリガー部分 */}
            {isPending ?
                <div className="flex items-center justify-center gap-2.5 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                    <ClipLoader color="oklch(76.5% 0.177 163.223)" />
                </div>
                :
                isError ?
                    <div className="flex items-center justify-center gap-2.5 px-3 py-2.5 bg-white border border-gray-200 rounded-lg">
                        <button
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-red-600 hover:bg-red-50"
                            onClick={logout}>
                            <BiLogOut className="w-4 h-4" />
                            ログアウト
                        </button>
                    </div> :
                    <div className={`flex items-center gap-2.5 px-3 py-2.5 bg-white border border-gray-200 cursor-pointer ${pulldown ? "rounded-t-lg" : "rounded-lg"}`}
                        onClick={() => setPulldown(!pulldown)}>
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                            <BiUser className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                            <div className="font-medium truncate">{data?.name}</div>
                            <div className="text-sm text-gray-500 truncate">{data?.email}</div>
                        </div>
                        {pulldown ?
                            <FaChevronUp className="w-4 h-4 text-gray-400 ml-auto" /> :
                            <FaChevronDown className="w-4 h-4 text-gray-400 ml-auto" />}
                    </div>
            }

            {pulldown && (
                <div className="absolute top-full left-0 mb-2 w-full bg-white border border-gray-200 border-t-0 shadow-lg overflow-hidden z-50 rounded-b-lg">
                    <div className="p-1.5">
                        <button
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm hover:bg-gray-50"
                            onClick={() => setNamePopUpOpen(true)}>
                            <PiPencil className="w-4 h-4 text-gray-500" />
                            ユーザー名変更
                        </button>
                        <button
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm hover:bg-gray-50"
                            onClick={() => setPasswordPopUpOpen(true)}>
                            <FaLock className="w-4 h-4 text-gray-500" />
                            パスワード変更
                        </button>
                    </div>
                    <div className="border-t border-gray-200 p-1.5">
                        <button
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                            onClick={logout}>
                            <BiLogOut className="w-4 h-4" />
                            ログアウト
                        </button>
                    </div>
                </div>
            )}
            {namePopUpOpen && <ChangeNamePopUp name={data?.name} onClose={() => setNamePopUpOpen(false)} />}
            {passwordPopUpOpen && <ChangePasswordPopUp onClose={() => setPasswordPopUpOpen(false)} />}
        </div>
    );
};