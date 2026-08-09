// PasswordChangeModal.tsx
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useUpdatePassword } from "../hooks/user/useUpdatePassword";
import type { UpdatePasswordRequest } from "../api/user";

type Props = {
    onClose: () => void;
};

export const ChangePasswordPopUp = ({ onClose }: Props) => {
    const mutation = useUpdatePassword();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UpdatePasswordRequest>();

    const newPassword = watch("newPassword");

    const onSubmit = (data: UpdatePasswordRequest) => {
        mutation.mutate(data, {
            onSuccess: onClose,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs mx-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-medium">パスワード変更</span>
                    <button onClick={onClose} aria-label="閉じる">
                        <FaTimes className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block text-sm text-gray-600 mb-1.5">現在のパスワード</label>
                    <input
                        {...register("currentPassword", {
                            required: "現在のパスワードを入力してください",
                        })}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.currentPassword && (
                        <p className="text-sm text-red-600 mb-2">{errors.currentPassword.message}</p>
                    )}

                    <label className="block text-sm text-gray-600 mb-1.5 mt-3">新しいパスワード</label>
                    <input
                        {...register("newPassword", {
                            required: "新しいパスワードを入力してください",
                            minLength: {
                                value: 8,
                                message: "パスワードは8文字以上で入力してください",
                            },
                        })}
                        type="password"
                        placeholder="8文字以上"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.newPassword && (
                        <p className="text-sm text-red-600 mb-2">{errors.newPassword.message}</p>
                    )}

                    <label className="block text-sm text-gray-600 mb-1.5 mt-3">新しいパスワード(確認)</label>
                    <input
                        {...register("confirmPassword", {
                            required: "確認用パスワードを入力してください",
                            validate: (value) =>
                                value === newPassword || "パスワードが一致しません",
                        })}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600 mb-2">{errors.confirmPassword.message}</p>
                    )}

                    {mutation.isError && (
                        <p className="text-sm text-red-600 text-center">
                            {mutation.error.message}
                        </p>
                    )}

                    <div className="flex gap-2 justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
                        >
                            変更する
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};