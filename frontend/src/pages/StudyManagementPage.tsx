import { Header } from "../components/Header"
import { Button } from "../ui/Button"

export const StudyManagementPage = () => {
    return (
        <div className="min-h-screen ">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between">
                    <h1 className="text-xl ml-6">学習記録</h1>
                    <Button>
                        <div className="flex items-center gap-3">
                            <span>+</span>
                            <span>セッションを追加</span>
                        </div>
                    </Button>
                </div>
            </main>
        </div>
    )
}