import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/auth/useLogin";
import { Link } from "react-router";
import type { LoginRequest } from "../api/user";
import { ClipLoader } from "react-spinners";


export const LoginPage = () => {
    const loginMutation = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>();

    const onSubmit = (data: LoginRequest) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="m-4 text-4xl font-extrabold text-center">TOEIC <span className="text-green-700">Tracker</span></div>

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
                            disabled={loginMutation.isPending}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                            disabled={loginMutation.isPending}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    {loginMutation.isError && (
                        <p className="text-sm text-red-600 text-center">
                            {loginMutation.error.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2 rounded-md text-sm transition-colors"
                    >
                        {loginMutation.isPending ? <ClipLoader size={20} /> : "ログイン"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-500 text-center">
                    アカウントをお持ちでない方は{" "}
                    <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                        新規登録
                    </Link>
                </p>
            </div>
        </div>
    );
};