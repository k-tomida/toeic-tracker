import { useForm, useWatch } from "react-hook-form";
import { ProgressBar } from "../../ui/ProgressBar";
import { calcBestScore } from "../../utils/calcScore";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import type { UserType } from "../../types/userType";
import type { scoreType } from "../../types/scoreType";
import { formatLocalDate } from "../../utils/formatDate";

type Props = {
    user: UserType;
    scores: scoreType[];
};

type GoalSettingForm = {
    targetScore: number | null;
    nextExamDate: string | null;
};

export const GoalSetting = ({ user, scores }: Props) => {
    const mutation = useUpdateUser();
    const today = formatLocalDate(new Date());

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = formatLocalDate(tomorrowDate);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<GoalSettingForm>({
        defaultValues: {
            targetScore: user.targetScore,
            nextExamDate: user.nextExamDate,
        },
    });

    const watchedScore = useWatch({
        control,
        name: "targetScore",
    });

    const score =
        typeof watchedScore === "number" && watchedScore > 0
            ? watchedScore
            : null;

    const [bestScore] = calcBestScore(scores);
    const isAchieved = score !== null && bestScore >= score;

    const onSubmit = (data: GoalSettingForm) => {
        if (
            data.targetScore === null ||
            data.nextExamDate === null
        ) {
            return;
        }

        mutation.mutate({
            targetScore: data.targetScore,
            nextExamDate: data.nextExamDate,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0"
        >
            <h2 className="mb-3 text-xl font-medium text-gray-600">
                目標設定
            </h2>

            <div className="mx-0 my-2 sm:m-2">
                <p className="text-lg text-gray-500">
                    目標スコア
                </p>

                <p className="py-3">
                    <input
                        {...register("targetScore", {
                            required: "スコアを入力してください",
                            valueAsNumber: true,
                            min: { value: 10, message: "10点以上で入力してください" },
                            max: { value: 990, message: "990点以下で入力してください" },
                            validate: (value) =>
                                value === null ||
                                value % 5 === 0 ||
                                "目標スコアは5点刻みで入力してください"
                        })}
                        type="number"
                        min={10}
                        max={990}
                        step={5}
                        disabled={mutation.isPending}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-20"
                    />
                    点
                </p>

                {errors.targetScore && (
                    <p className="text-sm text-red-600">
                        {errors.targetScore.message}
                    </p>
                )}

                {score === null ? (
                    <p className="py-3 text-gray-500">
                        目標スコアが未設定です
                    </p>
                ) : (
                    <div>
                        <ProgressBar
                            current={bestScore}
                            target={score}
                            barHeight="h-3"
                        />

                        <div className="flex justify-between p-1 text-sm text-gray-600">
                            <span>{bestScore}点</span>

                            {isAchieved ? (
                                <span className="text-green-600 font-medium">
                                    目標達成 🎉
                                </span>
                            ) : (
                                <span>
                                    残り{score - bestScore}点
                                    （
                                    {Math.round(
                                        (bestScore / score) * 100
                                    )}
                                    %）
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="mx-0 my-2 sm:m-2">
                <p className="text-lg text-gray-500">
                    次回受験予定日
                </p>

                <input
                    {...register("nextExamDate", {
                        required: "スコアを入力してください",
                        validate: (value) =>
                            value === null ||
                            value > today ||
                            "次回受験日は未来の日付を入力してください",
                    })}
                    type="date"
                    min={tomorrow}
                    disabled={mutation.isPending}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base sm:text-lg"
                />

                {errors.nextExamDate && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.nextExamDate.message}
                    </p>
                )}
            </div>

            {mutation.isError && (
                <p className="mt-1 text-sm text-red-600 text-center">
                    {mutation.error.message}
                </p>
            )}

            <div className="flex justify-center pt-3">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full max-w-[400px] bg-green-500 rounded-lg p-3 text-white hover:bg-green-600 active:bg-green-700 disabled:bg-green-300"
                >
                    {mutation.isPending ? "更新中..." : "更新"}
                </button>
            </div>
        </form>
    );
};