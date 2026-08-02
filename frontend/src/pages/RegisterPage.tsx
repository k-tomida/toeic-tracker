import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/auth/useRegister";
import { Link } from "react-router";

type RegisterForm = {
    email: string;
    name: string;
    password: string;
    targetScore: number | null;
    nextExamDate: string | null;
};

export const RegisterPage = () => {
    const registerMutation = useRegister();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit = (data: RegisterForm) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="m-4 text-4xl font-extrabold text-center">
                    TOEIC <span className="text-green-700">Tracker</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス
                        </label>
                        <input
                            {...register("email", {
                                required: "メールアドレスを入力してください",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "メールアドレスの形式が正しくありません",
                                },
                            })}
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ユーザーネーム
                        </label>
                        <input
                            {...register("name", {
                                required: "ユーザーネームを入力してください",
                            })}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="山田太郎"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            パスワード
                        </label>
                        <input
                            {...register("password", {
                                required: "パスワードを入力してください",
                                minLength: {
                                    value: 8,
                                    message: "パスワードは8文字以上で入力してください",
                                },
                            })}
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            目標スコア(任意)
                        </label>
                        <input
                            {...register("targetScore", {
                                valueAsNumber: true,
                                min: { value: 10, message: "10点以上で入力してください" },
                                max: { value: 990, message: "990点以下で入力してください" },
                            })}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="800"
                        />
                        {errors.targetScore && (
                            <p className="mt-1 text-sm text-red-600">{errors.targetScore.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            次回受験日(任意)
                        </label>
                        <input
                            {...register("nextExamDate")}
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    {registerMutation.isError && (
                        <p className="text-sm text-red-600 text-center">
                            登録に失敗しました。時間をおいて再度お試しください
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2 rounded-md text-sm transition-colors"
                    >
                        {registerMutation.isPending ? "登録中..." : "新規登録"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-500 text-center">
                    アカウントをお持ちの方は{" "}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        こちら
                    </Link>
                </p>
            </div>
        </div>
    );
};