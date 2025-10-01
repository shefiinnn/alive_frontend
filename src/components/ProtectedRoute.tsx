import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children:React.ReactNode;  
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({children})=>{
    const token=Cookies.get('access_token');

    return token?<>{children}</>:<Navigate to="/login" replace/>}

export default ProtectedRoute