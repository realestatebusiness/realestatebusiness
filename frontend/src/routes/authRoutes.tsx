import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage, Plp, RegisterPage } from "../pages";
import PropertyPage from "../components/PropertyPage";
import Filters from "../pages/Filters";
import { HomePage } from "../pages/HomePage";
import PropertiesNearMe from "../components/PropertiesNearMe";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createProperty" element={<PropertyPage />} />
<Route path="/plp" element={<Plp/>}/>       
   <Route path="/home" element={<HomePage />} />
          <Route path="/propertiesnearme" element={<PropertiesNearMe />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
