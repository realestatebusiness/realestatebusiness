import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import PropertyPage from "../components/PropertyPage";
import Filters from "../pages/Filters";
import { HomePage } from "../pages/HomePage";

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Navigate to='/register' />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/createProperty" element={<PropertyPage />}/>
                    <Route path="/filters" element={<Filters/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRouter