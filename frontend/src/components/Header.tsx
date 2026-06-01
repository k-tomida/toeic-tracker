import { Link } from "react-router"
import { IoHomeOutline, IoBook } from "react-icons/io5";
import { FaRegClock, FaChartBar } from "react-icons/fa";

export const Header = () => {
    return (
        <header className="border-b border-gray-300">
            <div className="m-4 text-3xl">TOEIC <span className="text-green-700">Tracker</span></div>
            <nav className="flex  space-x-5 m-2">
                <Link to="/" className="flex items-center"><IoHomeOutline />ダッシュボード</Link>
                <Link to="/" className="flex items-center"><FaRegClock />学習記録</Link>
                <Link to="/" className="flex items-center"><FaChartBar />スコア管理</Link>
                <Link to="/" className="flex items-center"><IoBook />語彙管理</Link>
            </nav>
        </header>
    )
}