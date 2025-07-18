import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/authRoutes"
import Header from "./components/atoms/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

const App=()=>{
   
  return (
    <div>
      <Header/>
      <AppRouter />
      <Footer/>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
export default App;