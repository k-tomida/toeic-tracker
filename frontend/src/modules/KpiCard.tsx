import type { ReactNode } from "react";

type Props = {
    title: ReactNode;
    value: number;
    unit?: string;
    sub?: string;
}

export const KpiCard = ({ title, value, unit, sub = "" }: Props) => {
    return (
        <div className="bg-stone-200 mx-3 my-5 rounded-xl p-3 lg:min-w-45 min-w-38 h-26">
            <p className="text-stone-600">{title}</p>
            <p className="text-3xl ">{value}<span className="text-xl">{unit}</span></p>
            <p className="text-stone-500">{sub}</p>
        </div>
    )
}