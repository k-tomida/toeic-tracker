import { Route, Routes } from "react-router"
import { Home } from "../pages/Home"
import { StudySession } from "../pages/StudySesssion"
import { Score } from "../pages/score"
import { Vocabulary } from "../pages/Vocabulary"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study-sessions" element={<StudySession />} />
            <Route path="/scores" element={<Score />} />
            <Route path="/vocabularies" element={<Vocabulary />} />
        </Routes>
    )
}