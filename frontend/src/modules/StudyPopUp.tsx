import type { studySessionType, categoryType } from "../types/studySessionType";
import { formatDate } from "../utils/formatDate";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCreateStudySession } from "../hooks/study_session/useCreateStudySession";
import { useUpdateStudySession } from "../hooks/study_session/useUpdateStudySession";
import { useDeleteStudySession } from "../hooks/study_session/useDeleteStudySession";
import { changeTagByCategory } from "../utils/changeTag";
import { useForm, useWatch } from "react-hook-form";
import type { studySessionFormType } from "../types/studySessionFormType";

type Props = {
    onClose: () => void;
    data: studySessionType | null;
};

const allCategories: categoryType[] = ["LISTENING", "VOCABULARY", "GRAMMAR", "MOCK_EXAM"];

export const StudyPopUp = ({ onClose, data }: Props) => {
    const createMutation = useCreateStudySession();
    const updateMutation = useUpdateStudySession();
    const deleteMutation = useDeleteStudySession();
    const { register, handleSubmit, control, formState: { errors } } = useForm<studySessionFormType>({
        defaultValues: {
            date: data?.date ?? new Date().toISOString().slice(0, 10),
            duration: data?.duration ?? 0,
            category: data?.category ?? "LISTENING",
            memo: data?.memo ?? ""
        }
    })

    const category = useWatch({ control, name: "category" });

    const onSubmit = (value: studySessionFormType) => {
        if (data !== null) {
            updateMutation.mutate({ id: data.id, updateStudySession: value }, { onSuccess: onClose });
        }
        else {
            createMutation.mutate(value, { onSuccess: onClose });
        }
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? formatDate(data.date) : "学習記録を追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {/* 日付と学習時間*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between my-3 gap-2">
                        <div>
                            <label className="text-gray-600 mb-1">日付</label>
                            <input
                                {...register("date")}
                                type="date"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56"
                            />
                        </div>
                        <div>
                            <label className="text-gray-600 mb-1">学習時間（分）</label>
                            <input
                                {...register("duration", {
                                    required: "学習時間を入力してください",
                                    valueAsNumber: true,
                                    min: { value: 1, message: "1分以上で入力してください" },
                                    max: { value: 1440, message: "1440分以下で入力してください" },
                                })}
                                type="number"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56"
                            />
                            {errors.duration && (
                                <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                            )}
                        </div>
                    </div>
                    {/* カテゴリ選択*/}
                    <div className="my-3">
                        <h2 className="text-gray-600 mb-2">カテゴリ</h2>
                        <div className="flex gap-3 py-1">
                            {allCategories.map(c =>
                                changeTagByCategory(c, "radio", c === category, register("category"))
                            )}
                        </div>
                    </div>
                    {/* メモ*/}
                    <div className="my-3">
                        <label className="text-gray-600 mb-2">メモ（任意）</label>
                        <input
                            {...register("memo", {
                                maxLength: { value: 200, message: "200文字以下で入力してください" }
                            })}
                            type="text"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                        />
                    </div>
                    {/* 削除ボタンは編集時のみ表示 */}
                    <div className="flex justify-between mt-7">
                        {data !== null ? (
                            <Button onClick={() => {
                                deleteMutation.mutate(data.id); onClose();
                            }}>
                                <span className="flex gap-2 items-center">
                                    <FaRegTrashAlt /> 削除
                                </span>
                            </Button>
                        ) : (<div />)}

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
            </div>
        </div >
    );
};