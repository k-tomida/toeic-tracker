import { IoHomeOutline, IoBook } from "react-icons/io5";
import { FaRegClock, FaChartBar } from "react-icons/fa";
import { NavItem } from "../modules/NavItem";

export const Header = () => {
    return (
        <header className="border-b border-gray-300 bg-white ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="m-4 text-4xl font-extrabold">TOEIC <span className="text-green-700">Tracker</span></div>
                <nav className="flex  space-x-5 m-2">
                    <NavItem to="/" icon={<IoHomeOutline />} label="ダッシュボード" />
                    <NavItem to="/study-sessions" icon={<FaRegClock />} label="学習記録" />
                    <NavItem to="/scores" icon={<FaChartBar />} label="スコア管理" />
                    <NavItem to="/vocabularies" icon={<IoBook />} label="語彙管理" />
                </nav>
            </div>
        </header>
    )
}