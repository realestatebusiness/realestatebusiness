import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage, Plp, RegisterPage } from "../pages";
import PropertyPage from "../components/PropertyPage";
import Filters from "../pages/Filters";
import { HomePage } from "../pages/HomePage";
import PropertiesNearMe from "../components/PropertiesNearMe";
import ManageProfile from "../pages/ManageProfile/ManageProfile";


const AppRouter = () => {
  return (
    <>

      <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createProperty" element={<PropertyPage />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/plp" element={<Plp/>}/>    
          <Route path="/home" element={<HomePage />} />
          <Route path="/propertiesnearme" element={<PropertiesNearMe />} />
          <Route path="/profile" element={<ManageProfile />} />
      </Routes>

    </>
          
  );
};

export default AppRouter;
