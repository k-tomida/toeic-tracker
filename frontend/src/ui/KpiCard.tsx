type Props = {
    title: string;
}

export const KpiCard = ({ title }: Props) => {
    return (
        <div className="bg-stone-200 m-5 rounded-xl p-3  ">
            <p>{title}</p>
        </div>
    )
}