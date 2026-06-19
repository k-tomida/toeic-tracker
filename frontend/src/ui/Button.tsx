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
            p-2
            border
            border-gray-300
            rounded-md
            transition-all
            duration-200
            hover:bg-gray-100
            hover:shadow-md
            hover:-translate-y-0.5 
            cursor-pointer">
            {children}
        </button>
    );
};
