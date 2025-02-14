import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Login = () => {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(name, password); // Usuario quemado para pruebas

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className=" text-gray-900 text-lg font-bold">Iniciar sesión</h2>
            <form className="text-gray-900">
                <input type="text" placeholder="Usuario" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
                <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmit}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;