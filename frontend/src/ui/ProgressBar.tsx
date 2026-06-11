import { useEffect, useState } from "react";

type Props = {
    current: number;
    target: number;
};

export const ProgressBar = ({ current, target }: Props) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(percentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-5">
                <div
                    className="bg-green-500 h-5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};