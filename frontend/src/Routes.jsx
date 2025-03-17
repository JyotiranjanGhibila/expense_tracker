import { Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

  
const AllRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element= {
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>
        </Routes>
    )
}

export default AllRoutes;