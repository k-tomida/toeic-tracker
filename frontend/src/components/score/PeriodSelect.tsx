import { useState } from "react";
import { Select } from "../../ui/Select";

const categoryOptions = [
    { label: "期間 : すべて", value: "all" },
    { label: "今月", value: "thisMonth" },
    { label: "先月", value: "lastMonth" },
    { label: "過去3ヶ月", value: "lastThreeMonth" }
];

export const PeriodSelect = () => {
    const [category, setCategory] = useState("all");
    return (
        <Select name="category" value={category} onChange={setCategory} options={categoryOptions} />
    );
};