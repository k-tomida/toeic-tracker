import type { categoryType } from "../types/categoryType";
import type { OrderType } from "../types/orderType";
import type { periodType } from "../types/periodType";

type Props = {
    name: string;
    value: OrderType | periodType | categoryType;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
};

export const Select = ({ name, value, onChange, options }: Props) => {
    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="py-2 pr-25 border border-gray-400 rounded-md bg-white"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};