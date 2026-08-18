import type { ReactNode } from "react";

type Props = {
    title: ReactNode;
    value: number;
    unit?: string;
    sub?: string;
};

export const KpiCard = ({
    title,
    value,
    unit,
    sub = "",
}: Props) => {
    return (
        <div className="w-full min-w-0 min-h-28 bg-stone-200 rounded-xl p-4">
            <p className="text-sm text-stone-600">
                {title}
            </p>

            <p className="mt-1 text-2xl sm:text-3xl">
                {value}
                {unit && (
                    <span className="ml-1 text-lg sm:text-xl">
                        {unit}
                    </span>
                )}
            </p>

            <p className="mt-1 text-sm text-stone-500">
                {sub}
            </p>
        </div>
    );
};