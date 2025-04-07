import React from "react";
import "../css/login.css"
import { FaArrowRight  } from "react-icons/fa";
import { SlRocket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";



function Login(){
    const navigate = useNavigate();

    return(
        <main>
            <form>
            <label className="lblName">Enter your name :
                <input type="text" />
            </label>
            <label className="lblPwd">Enter your password :
                    <input type="password" />
            </label>
            <button><SlRocket /> Login</button>
            <button 
                onClick={() => navigate("/register")}
                className="back-button"
            >
                <FaArrowRight /> Regester
            </button>
            </form>
        </main>
    );
};

export default Login;
