import React, { useState } from "react";
import "../css/register.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas!");
            return;
        }

        const postData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('https://api.m306.ch/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement');
            }

            const data = await response.json();
            console.log('Succès:', data);
            navigate("/");
            
        } catch (error) {
            console.error('Erreur:', error);
            alert("Une erreur est survenue lors de l'enregistrement");
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label className="lblName">Enter your name :
                    <input 
                        type="text"
                        name="name"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="lblEmail">Enter your email :
                    <input 
                        type="email"
                        name="email"
                        placeholder="exemple@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="lblPwd">Enter your password :
                    <input 
                        type="password"
                        name="password"
                        placeholder="My password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="lblPwd">Confirm your password :
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="My password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit"><SlUserFollow /> Register</button>
                <button 
                    onClick={() => navigate("/")}
                    className="back-button"
                    type="button"
                >
                    <FaArrowLeft /> Retour
                </button>
            </form>
        </main>
    );
};

export default Register;