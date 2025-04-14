import React from "react";
import styles from "./css/home.module.css";

function Home() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <div className={styles.homeBody}>
            <div className={styles.homeMain}>
                <p>yoyo wassup'</p>
                <button onClick={handleLogout}>Deconnexion</button>
            </div>
        </div>
    );
}

export default Home;