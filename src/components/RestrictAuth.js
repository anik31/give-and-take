import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "context";

export function RestrictAuth({ children }) {
    const {isLoggedIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    return isLoggedIn ? navigate(location?.state?.from?.pathname || "/") : children;
}