import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/authRoutes"
import Header from "./components/atoms/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App=()=>{
   
  return (
    <div>
      <Header/>
      <AppRouter />
      <Footer/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
export default App;