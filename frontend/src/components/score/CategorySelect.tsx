import { useState } from "react";
import { Select } from "../../ui/Select";

const categoryOptions = [
    { label: "すべてのカテゴリ", value: "all" },
    { label: "リスニング", value: "listening" },
    { label: "単語", value: "vocabulary" },
    { label: "文法", value: "grammar" },
    { label: "模試", value: "full" },
];

export const CategorySelect = () => {
    const [category, setCategory] = useState("all");
    return (
        <Select name="category" value={category} onChange={setCategory} options={categoryOptions} />
    );
};