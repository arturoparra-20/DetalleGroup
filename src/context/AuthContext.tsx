import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

interface User {
    id: number;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const users = [
    { id: 4, name: "Alejandro Pérez", password: "12345" },
    { id: 5, name: "Anastasia Gómez", password: "password" },
    { id: 6, name: "Carlos Ruiz", password: "admin" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = (name: string, password: string) => {
        const foundUser = users.find((u) => u.name === name && u.password === password);
        if (foundUser) {
            setUser({ id: foundUser.id, name: foundUser.name });
            console.log("Usuario logeado", foundUser)
            router.push("/grupo/1"); // Redirigir a la página del grupo 1 después del login
        } else {
            console.log("Credenciales incorrectas")
        }
    };

    const logout = () => {
        setUser(null);
        router.push("/login"); // Redirigir a la página de login al cerrar sesión
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};