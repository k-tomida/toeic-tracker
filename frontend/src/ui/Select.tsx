type Props = {
    name: string;
    value: string;
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
            className="py-2 pr-25"
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};