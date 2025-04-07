import React, { useState } from "react";
import "../css/login.css";
import { FaArrowRight } from "react-icons/fa";
import { SlRocket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("https://api.m306.ch/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                const data = await response.json();
                
                localStorage.setItem("authToken", data.token);
                navigate("/home");
            } else {
                setError("Identifiants incorrects");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <label className="lblName">
                Enter your name :
                    <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                
                <label className="lblPwd">
                Enter your password :
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Chargement..." : (
                        <>
                            <SlRocket /> Login
                        </>
                    )}
                </button>
                
                <button 
                    type="button"
                    onClick={() => navigate("/register")}
                    className="back-button"
                >
                    <FaArrowRight /> register
                </button>
            </form>
        </main>
    );
}

export default Login;