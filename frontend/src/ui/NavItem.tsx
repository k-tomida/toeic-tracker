import type { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
    to: string,
    icon: ReactNode
    label: string
}

export const NavItem = ({ to, icon, label }: Props) => {
    return (
        <NavLink to={to} className={({ isActive }) => `p-1 flex items-center rounded-xl hover:bg-gray-100 ${isActive ? "text-green-700" : ""}`}>
            {icon}{label}
        </NavLink>
    );
}