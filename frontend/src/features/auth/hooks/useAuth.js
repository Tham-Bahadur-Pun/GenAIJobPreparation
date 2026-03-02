import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getMe } from "../services/auth.api";

export const useAuth = () => {
    const { user, loading, setUser, setLoading } = useContext(AuthContext);

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ userName, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ userName, email, password });
            setUser(data.user);
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    }

    const fetchMe = async () => {
        setLoading(true);
        try {
            const data = await getMe();
            setUser(data.user);
        } catch (error) {
            console.error("Fetch me error:", error);
        } finally {
            setLoading(false);
        }
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