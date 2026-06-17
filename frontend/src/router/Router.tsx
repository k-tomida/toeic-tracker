import { Route, Routes } from "react-router"
import { HomePage } from "../pages/HomePage"
import { StudyManagementPage } from "../pages/StudyManagementPage"
import { ScorePage } from "../pages/ScorePage"
import { VocabularyPage } from "../pages/VocabularyPage"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/study-sessions" element={<StudyManagementPage />} />
            <Route path="/scores" element={<ScorePage />} />
            <Route path="/vocabularies" element={<VocabularyPage />} />
        </Routes>
    )
}