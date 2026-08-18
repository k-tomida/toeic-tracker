import { Link } from "react-router";

export const NotFoundPage = () => {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">

                <p className="text-7xl font-bold text-emerald-600">
                    404
                </p>

                <h1 className="mt-4 text-2xl font-bold text-gray-800">
                    ページが見つかりません
                </h1>

                <p className="mt-3 text-gray-500">
                    URLが間違っているか、ページが移動・削除された可能性があります。
                </p>

                <div className="mt-8 flex justify-center gap-3">
                    <Link
                        to="/dash-board"
                        className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                        ホームへ戻る
                    </Link>
                </div>
            </div>
        </main>
    );
};