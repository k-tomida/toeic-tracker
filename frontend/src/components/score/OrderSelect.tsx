import { useState } from "react";
import { Select } from "../../ui/Select";

const categoryOptions = [
    { label: "並び順: 新しい順", value: "newest" },
    { label: "古い順", value: "oldest" },
    { label: "学習時間が長い順", value: "longest" },
];

export const OrderSelect = () => {
    const [category, setCategory] = useState("all");
    return (
        <Select name="category" value={category} onChange={setCategory} options={categoryOptions} />
    );
};