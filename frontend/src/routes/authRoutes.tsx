import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../pages"

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Navigate to='/register' />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />}/>

                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter