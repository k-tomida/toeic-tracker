import { useEffect, useState } from "react";

type Props = {
    current: number;
    target: number;
    color?: string;
    barHeight: string;
};

export const ProgressBar = ({ current, target, color = "bg-green-500", barHeight }: Props) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(percentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <div className={`flex-1 bg-gray-100 rounded-full ${barHeight}`}>
            <div
                className={`${color} ${barHeight} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${width}%` }}
            />
        </div>
    );
};