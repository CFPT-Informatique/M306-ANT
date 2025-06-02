import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import styles from "./css/register.module.css";
import Swal from 'sweetalert2'


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
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
           // alert("Les mots de passe ne correspondent pas!");
           Swal.fire({
            title: 'Attention!',
            text: 'Les mots de passe ne correspondent pas!',
            icon: 'warning',
            confirmButtonText: 'Continue',
            background:"#1e1e1e",
            color:"#e0e0e0"
          })
            return;
        }

        const postData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch("http://localhost:5294/api/auth/register", {
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
            Swal.fire({
                position: "top-end",
                icon: "Success",
                title: "Compte créer avec succès",
                showConfirmButton: false,
                timer: 1500,
                background:"#1e1e1e",
                color:"#e0e0e0"
              })
            navigate("/");
            
        } catch (error) {
            console.error('Erreur:', error);
            // alert("Une erreur est survenue lors de l'enregistrement");
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Continue',
                background:"#1e1e1e",
                color:"#e0e0e0"
              })
        }
    };

    return (
        <div className={styles.registerBody}>
            <div className={styles.registerMain}>
                <form onSubmit={handleSubmit}>
                    <label>Enter your username :
                        <input 
                            type="text"
                            name="username"
                            placeholder="E.g: Scared, TokyoBoy..."
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Enter your E-Mail :
                        <input 
                            type="email"
                            name="email"
                            placeholder="E.g: exemple@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Enter your password :
                        <input 
                            type="password"
                            name="password"
                            placeholder="E.g: MySuperPass"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>Confirm your password :
                        <input 
                            type="password"
                            name="confirmPassword"
                            placeholder="E.g: MySuperPass"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit"><SlUserFollow /> Register</button>
                    <button 
                        onClick={() => navigate("/")}
                        type="button"
                    >
                        <FaArrowLeft /> Retour
                    </button>

                </form>

                
            </div>
        </div>
    );
};

export default Register;
