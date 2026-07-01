type Props<T extends string> = {
    name: string;
    value: T;
    onChange: (value: T) => void;
    options: { value: T; label: string }[];
};

export const Select = <T extends string>({ name, value, onChange, options }: Props<T>) => {
    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
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