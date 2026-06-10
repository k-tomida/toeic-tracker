import type { ReactNode } from "react";
import { NavLink } from "react-router";

type Props = {
    to: string;
    icon: ReactNode;
    label: string;
}

export const NavItem = ({ to, icon, label }: Props) => {
    return (
        <NavLink to={to} className={({ isActive }) => `p-1 flex items-center rounded-xl hover:bg-gray-100 ${isActive ? "bg-gray-200" : ""}`}>
            {icon}<span className="ml-1">{label}</span>
        </NavLink>
    );
}