import { useState } from "react";
import {
    IoHomeOutline,
    IoBook,
    IoMenuOutline,
    IoCloseOutline,
} from "react-icons/io5";
import { FaRegClock, FaChartBar } from "react-icons/fa";
import { NavItem } from "../modules/NavItem";
import { AccountMenu } from "../modules/AccountMenu";

const navItems = [
    {
        to: "/dash-board",
        icon: <IoHomeOutline />,
        label: "ダッシュボード",
    },
    {
        to: "/study-sessions",
        icon: <FaRegClock />,
        label: "学習記録",
    },
    {
        to: "/vocabularies",
        icon: <IoBook />,
        label: "語彙管理",
    },
    {
        to: "/scores",
        icon: <FaChartBar />,
        label: "スコア管理",
    },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(previous => !previous);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className="relative z-50 border-b border-gray-300 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full flex items-center justify-between">
                    {/* ロゴ */}
                    <div className="py-4 text-2xl font-extrabold whitespace-nowrap lg:text-4xl">
                        TOEIC{" "}
                        <span className="text-green-700">
                            Tracker
                        </span>
                    </div>

                    {/* PC用ナビゲーション */}
                    <div className="hidden lg:flex items-center gap-6">
                        <nav className="flex items-center gap-5">
                            {navItems.map(item => (
                                <NavItem
                                    key={item.to}
                                    to={item.to}
                                    icon={item.icon}
                                    label={item.label}
                                />
                            ))}
                        </nav>

                        <AccountMenu />
                    </div>

                    {/* スマホ・タブレット用メニューボタン */}
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="ml-auto flex shrink-0 items-center justify-center p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 lg:hidden"
                        aria-label={
                            isOpen
                                ? "メニューを閉じる"
                                : "メニューを開く"
                        }
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        {isOpen ? (
                            <IoCloseOutline className="w-6 h-6" />
                        ) : (
                            <IoMenuOutline className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* スマホ・タブレット用メニュー */}
                {isOpen && (
                    <div
                        id="mobile-menu"
                        className="border-t border-gray-200 py-3 lg:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map(item => (
                                <div
                                    key={item.to}
                                    className="w-full"
                                    onClick={closeMenu}
                                >
                                    <NavItem
                                        to={item.to}
                                        icon={item.icon}
                                        label={item.label}
                                    />
                                </div>
                            ))}
                        </nav>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <AccountMenu />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};