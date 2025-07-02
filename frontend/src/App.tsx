import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/authRoutes"
const App=()=>{
  return (
    <div>
      <AppRouter/>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}
export default App;