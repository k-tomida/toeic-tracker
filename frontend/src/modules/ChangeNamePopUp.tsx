import { useForm } from "react-hook-form";
import { useUpdateName } from "../hooks/user/useUpdateName";


type Props = {
    onClose: () => void;
    name?: string;
};

type FormValues = {
    name: string;
};

export const ChangeNamePopUp = ({ onClose, name }: Props) => {
    const mutation = useUpdateName();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: { name: name }
    })

    const onsubmit = (data: FormValues) => {
        mutation.mutate(data);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        ユーザー名変更
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <label className="block text-sm text-gray-600 mb-1.5">ユーザーネーム</label>
                    <input
                        {...register("name", { required: "ユーザーネームを入力してください" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.name && <p className="text-sm text-red-600 mb-3">{errors.name.message}</p>}

                    <div className="flex gap-2 justify-end mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                            キャンセル
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md">
                            保存する
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};