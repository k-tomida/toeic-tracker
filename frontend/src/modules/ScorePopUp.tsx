import { formatDateSlash } from "../utils/formatDate";
import { FaRegTrashAlt } from "react-icons/fa";
import type { scoreType } from "../types/scoreType";
import { useCreateScore } from "../hooks/score/useCreateScore";
import { useUpdateScore } from "../hooks/score/useUpdateScore";
import { useDeleteScore } from "../hooks/score/useDeleteScore";
import { useForm, useWatch } from "react-hook-form";
import type { scoreFormType } from "../types/scoreFormType";

type Props = {
    onClose: () => void;
    data: scoreType | null;
};

export const ScorePopUp = ({ onClose, data }: Props) => {
    const createMutation = useCreateScore();
    const updateMutation = useUpdateScore();
    const deleteMutation = useDeleteScore();
    const { register, handleSubmit, control, formState: { errors } } = useForm<scoreFormType>({
        defaultValues: {
            examDate: data?.examDate ?? new Date().toISOString().slice(0, 10),
            listeningScore: data?.listeningScore ?? 0,
            readingScore: data?.readingScore ?? 0,
            memo: data?.memo ?? "",
        }
    });
    const listening = useWatch({ control, name: "listeningScore" });
    const reading = useWatch({ control, name: "readingScore" });

    const onSubmit = (value: scoreFormType) => {
        if (data !== null) {
            updateMutation.mutate({ id: data.id, updateScore: value }, { onSuccess: onClose });
        } else {
            createMutation.mutate(value, { onSuccess: onClose });
        }
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? formatDateSlash(data.examDate) : "スコアを追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {/* 日付 */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-gray-600 mb-1">日付</label>
                        <input
                            {...register("examDate")}
                            type="date"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                        />
                    </div>
                    {/* リスニングとリーディング*/}
                    <div className="flex justify-between my-4">
                        <div>
                            <label className="text-gray-600">リスニング</label>
                            <div className="flex items-end gap-1">
                                <input
                                    {...register("listeningScore", {
                                        required: "スコアを入力してください",
                                        valueAsNumber: true,
                                        min: { value: 5, message: "5以上で入力してください" },
                                        max: { value: 495, message: "495以下で入力してください" },
                                    })}
                                    type="number"
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-40"
                                />
                                <span className="text-gray-600 text-lg">/495</span>
                            </div>
                            {errors.listeningScore && (
                                <p className="mt-1 text-sm text-red-600">{errors.listeningScore.message}</p>
                            )}

                        </div>
                        <div>
                            <label className="text-gray-600">リーディング</label>
                            <div className="flex items-end gap-1">
                                <input
                                    {...register("readingScore", {
                                        required: "スコアを入力してください",
                                        valueAsNumber: true,
                                        min: { value: 5, message: "5以上で入力してください" },
                                        max: { value: 495, message: "495以下で入力してください" },
                                    })}
                                    type="number"
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-40"
                                />
                                <span className="text-gray-600 text-lg">/495</span>
                            </div>
                            {errors.readingScore && (
                                <p className="mt-1 text-sm text-red-600">{errors.readingScore.message}</p>
                            )}

                        </div>
                    </div>
                    {/* 合計 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex justify-between items-center">
                        <span className="text-sm text-green-800">合計スコア</span>
                        <span className="text-2xl font-bold text-green-600">
                            {(isNaN(listening) ? 0 : listening) + (isNaN(reading) ? 0 : reading)}
                        </span>
                    </div>
                    {/* メモ*/}
                    <div className="my-4">
                        <label className="text-gray-600 mb-2">メモ（任意）</label>
                        <input
                            {...register("memo", {
                                maxLength: { value: 200, message: "200文字以内で入力してください" }
                            })}
                            type="text"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                        />
                        {errors.memo && (
                            <p className="mt-1 text-sm text-red-600">{errors.memo.message}</p>
                        )}
                    </div>
                    {/* 削除ボタンは編集時のみ表示 */}
                    <div className="flex justify-between mt-7">
                        {data !== null ? (
                            <button
                                type="button"
                                onClick={() => deleteMutation.mutate(data.id, { onSuccess: onClose })}
                                className="px-4 py-2 text-lg border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <span className="flex items-center gap-1"><FaRegTrashAlt className="h-5 w-5" /> 削除</span>
                            </button>
                        ) : <div />}

                        {data !== null ?
                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                            >
                                {updateMutation.isPending ? "保存中..." : "保存する"}
                            </button>
                            :
                            <button
                                type="submit"
                                disabled={createMutation.isPending}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                            >
                                {createMutation.isPending ? "追加中..." : "追加する"}

                            </button>}
                    </div>
                    {(createMutation.isError || updateMutation.isError || deleteMutation.isError) && (
                        <p className="mt-1 text-sm text-red-600">
                            失敗しました。もう一度お試しください。
                        </p>
                    )}
                </form>
            </div >
        </div >
    );
};