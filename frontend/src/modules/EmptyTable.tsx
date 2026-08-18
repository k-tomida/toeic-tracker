import type { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
};

export const EmptyTable = ({
    icon,
    title,
    description,
    action,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
            <div className="p-4 mb-4 bg-emerald-100 text-emerald-600 rounded-full">
                {icon}
            </div>

            <p className="text-lg font-medium text-gray-700">
                {title}
            </p>

            {description && (
                <p className="mt-2 text-sm text-gray-500">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-5">
                    {action}
                </div>
            )}
        </div>
    );
};