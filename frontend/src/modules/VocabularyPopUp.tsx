import type { statusType, vocabularyType, wordClassType } from "../types/vocabularyType";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCreateVocabulary } from "../hooks/vocabulary/useCreateVocabulary";
import { changeTagByStatus } from "../utils/changeTag";
import { useUpdateVocabulary } from "../hooks/vocabulary/useUpdateVocabulary";
import { useDeleteVocabulary } from "../hooks/vocabulary/useDeleteVocabulary";
import { useForm, useWatch } from "react-hook-form";
import type { vocabularyFormType } from "../types/vocabularyFormType";

type Props = {
    onClose: () => void;
    data: vocabularyType | null;
};

const wordClassOptions: { label: string, value: wordClassType }[] = [
    { label: "名詞", value: "NOUN" },
    { label: "動詞", value: "VERB" },
    { label: "形容詞", value: "ADJECTIVE" },
    { label: "副詞", value: "ADVERB" },
    { label: "前置詞", value: "PREPOSITION" },
    { label: "接続詞", value: "CONJUNCTION" },
    { label: "助動詞", value: "AUXILIARY_VERB" }
];

const allStatus: statusType[] = ["UNACQUIRED", "ACQUIRED"];

export const VocabularyPopUp = ({ onClose, data }: Props) => {
    const createMutation = useCreateVocabulary();
    const updateMutation = useUpdateVocabulary();
    const deleteMutation = useDeleteVocabulary();
    const { register, handleSubmit, control, formState: { errors } } = useForm<vocabularyFormType>({
        defaultValues: {
            word: data?.word ?? "",
            wordClass: data?.wordClass ?? "NOUN",
            meaning: data?.meaning ?? "",
            status: data?.status ?? "UNACQUIRED",
            memo: data?.memo ?? ""
        }
    })

    const status = useWatch({ control, name: "status" });

    const onSubmit = (value: vocabularyFormType) => {
        if (data !== null) {
            updateMutation.mutate({ id: data.id, updateVocabulary: value }, { onSuccess: onClose });
        } else {
            createMutation.mutate(value, { onSuccess: onClose });
        }
    }

    const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? "単語を編集" : "単語を追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between my-4">
                        <div>
                            <label className="text-gray-600 mb-1">単語</label>
                            <input
                                {...register("word", {
                                    required: "単語を入力してください",
                                    maxLength: { value: 50, message: "50文字以内で入力してください" }
                                })}
                                type="text"
                                disabled={isPending}
                                placeholder="例 : people"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56" />
                            {errors.word && (
                                <p className="mt-1 text-sm text-red-600">{errors.word.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-gray-600 mb-1">品詞</label>
                            <select
                                {...register("wordClass")}
                                className="py-2 border border-gray-400 rounded-md bg-white w-56"
                                disabled={isPending}
                            >
                                {wordClassOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="my-2">
                        <label className="text-gray-600 mb-1">意味</label>
                        <input
                            {...register("meaning", {
                                required: "意味を入力してください",
                                maxLength: { value: 100, message: "100文字以内で入力してください" }
                            })}
                            type="text"
                            disabled={isPending}
                            placeholder="例 : 人々"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full" />
                        {errors.meaning && (
                            <p className="mt-1 text-sm text-red-600">{errors.meaning.message}</p>
                        )}
                    </div>
                    <div className="my-3">
                        <h2 className="text-gray-600 mb-1">ステータス</h2>
                        <div className="flex gap-6 justify-center">
                            {allStatus.map((s => changeTagByStatus(s, "radio", s === status, register("status"), isPending)))}
                        </div>
                    </div>
                    <div className="my-3">
                        <label className="text-gray-600 mb-2">メモ（任意）</label>
                        <input
                            {...register("memo", {
                                maxLength: { value: 200, message: "200文字以内で入力してください" }
                            })}
                            type="text"
                            disabled={isPending}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                        />
                        {errors.memo && (
                            <p className="mt-1 text-sm text-red-600">{errors.memo.message}</p>
                        )}
                    </div>
                    <div className="flex justify-between mt-7">
                        {data !== null ? (
                            <button
                                type="button"
                                disabled={isPending}
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
                            {createMutation.error?.message || updateMutation.error?.message || deleteMutation.error?.message ||
                                "失敗しました。もう一度お試しください。"}
                        </p>
                    )}
                </form>
            </div>
        </div >
    )
}