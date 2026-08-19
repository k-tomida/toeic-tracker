import { FiAlertCircle, FiRefreshCcw } from "react-icons/fi";

export const ErrorPage = ({ onRetry }: { onRetry?: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <FiAlertCircle className="w-10 h-10 text-gray-400" />
            <p className="text-gray-800 font-medium">データを取得できませんでした</p>
            <p className="text-sm text-gray-500">時間をおいて再度お試しください</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#22c55e] text-white text-sm hover:bg-green-600 transition-colors"
                >
                    <FiRefreshCcw className="w-4 h-4" />
                    再試行
                </button>
            )}
        </div>
    );
}