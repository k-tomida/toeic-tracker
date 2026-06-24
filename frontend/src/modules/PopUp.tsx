import type { tableType } from "../types/tableType";
import { formatDate } from "../utils/formatDate";

type Props = {
    onClose: () => void;
    data: tableType;
};

export const PopUp = ({ onClose, data }: Props) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h2 className="text-lg font-semibold mb-4">{formatDate(data.date)}</h2>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600" onClick={onClose}>
                    閉じる
                </button>
            </div>
        </div>
    )
}