// AccountMenu.tsx
import { PiPencil } from "react-icons/pi";
import { FaChevronDown, FaLock } from "react-icons/fa";
import { BiLogOut, BiUser } from "react-icons/bi";

export const AccountMenu = () => {
    return (
        <div className="w-60 bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* トリガー部分 */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-200">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <BiUser className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <div className="font-medium truncate">Kenta</div>
                    <div className="text-sm text-gray-500 truncate">kenta@example.com</div>
                </div>
                <FaChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
            </div>

            {/* メニュー項目
            <div className="p-1.5">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm hover:bg-gray-50">
                    <PiPencil className="w-4 h-4 text-gray-500" />
                    ユーザー名変更
                </button>
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm hover:bg-gray-50">
                    <FaLock className="w-4 h-4 text-gray-500" />
                    パスワード変更
                </button>
            </div>

            <div className="border-t border-gray-200 p-1.5">
                <button className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
                    <BiLogOut className="w-4 h-4" />
                    ログアウト
                </button>
            </div> */}
        </div>
    );
};