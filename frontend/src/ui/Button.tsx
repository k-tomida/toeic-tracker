import type { ReactNode } from "react";

type Props = {
    bgColor?: string;
    children: ReactNode;
    onClick?: () => void;
};

export const Button = ({
    children,
}: Props) => {
    return (
        <button
            className="
            shadow-md
            shadow-green-100
            p-2
            border
            border-gray-300
            rounded-md
            transition-all
            duration-200
            hover:-translate-y-0.5 
            cursor-pointer">
            {children}
        </button>
    );
};
