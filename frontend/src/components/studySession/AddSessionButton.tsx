import { Button } from "../../ui/Button"

type AddSessionButtonProps = {
    onClick: () => void;
};

export const AddSessionButton = ({ onClick }: AddSessionButtonProps) => {
    return (
        <Button onClick={onClick}>
            <div className="flex items-center gap-3">
                <span>+</span>
                <span>学習記録を追加</span>
            </div>
        </Button>
    )
}