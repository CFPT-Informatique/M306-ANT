import React from "react";
import "../css/register.css"

function Register(){
    return(
        <main>
            <form>
            <label className="lblName">Enter your name :
                <input type="text" />
            </label>
            <label className="lblPwd">Enter your password :
                    <input type="password" />
            </label>
            <label className="lblPwd">confirm your password :
                    <input type="password" />
            </label>
            <button>Register</button>
            
            </form>
        </main>
    );
};

export default Register;
