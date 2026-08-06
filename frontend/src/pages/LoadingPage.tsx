import { ClipLoader } from "react-spinners"

export const LoadingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
            <ClipLoader color="oklch(76.5% 0.177 163.223)" size={60} />
        </div>
    )
}