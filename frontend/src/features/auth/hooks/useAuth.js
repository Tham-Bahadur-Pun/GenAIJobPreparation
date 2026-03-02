import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe } from "../services/auth.api";

export const useAuth = () => {
    const { user, loading, setUser, setLoading } = useContext(AuthContext);

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        const data = await login({ email, password });
        setUser(data.user);
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true);
        await logout();
        setUser(null);
        setLoading(false);
    }

    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true);
        const data = await register({ userName, email, password });
        setUser(data.user);
        setLoading(false);
    }

    const fetchMe = async () => {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
    }

    return {
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister,
        fetchMe
    }
}