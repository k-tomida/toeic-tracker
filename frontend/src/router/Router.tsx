import { Route, Routes } from "react-router"
import { HomePage } from "../pages/HomePage"
import { StudyManagementPage } from "../pages/StudyManagementPage"
import { ScorePage } from "../pages/ScorePage"
import { VocabularyPage } from "../pages/VocabularyPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ProtectedRoute } from "./ProtectedRoute"
import { PublicOnlyRoute } from "./PublicOnlyRoute"

export const Router = () => {
    return (
        <Routes>
            <Route element={<PublicOnlyRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />} >
                <Route path="/dash-board" element={<HomePage />} />
                <Route path="/study-sessions" element={<StudyManagementPage />} />
                <Route path="/scores" element={<ScorePage />} />
                <Route path="/vocabularies" element={<VocabularyPage />} />
            </Route>
        </Routes>
    )
}