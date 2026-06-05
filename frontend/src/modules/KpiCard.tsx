import type { ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
}

export const KpiCard = ({ title, icon }: Props) => {
    return (
        <div className="bg-stone-200 m-5 rounded-xl p-3 ">
            <p className="flex items-center">{icon}{title}</p>
        </div>
    )
}