import { Button } from "../../ui/Button"

export const AddSessionButton = () => {
    return (
        <Button>
            <div className="flex items-center gap-3">
                <span>+</span>
                <span>セッションを追加</span>
            </div>
        </Button>
    )
}