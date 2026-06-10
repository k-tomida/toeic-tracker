import type { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    value: number;
    unit?: string;
    sub?: string;
}

export const KpiCard = ({ title, icon, value, unit, sub }: Props) => {
    return (
        <div className="bg-stone-200 mx-3 my-5 rounded-xl p-3 min-w-50">
            <p className="flex items-center text-stone-600">{icon}{title}</p>
            <p className="text-3xl ">{value}<span className="text-xl">{unit}</span></p>
            <p className="text-stone-500">{sub}</p>
        </div>
    )
}