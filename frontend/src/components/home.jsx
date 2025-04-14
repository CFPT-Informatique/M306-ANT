import React from "react";
import styles from "./css/home.module.css";

function Home() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <div className={styles.homeContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>M306 : LiveChat</div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Déconnexion
                </button>
            </header>

            {/* Contenu principal : aside gauche (channels), chat central, aside droit (users) */}
            <div className={styles.mainContent}>
                {/* Liste des salons (channels) */}
                <aside className={styles.channelList}>
                    <ul>
                        <li className={styles.active}>Chat</li>
                        <li>Images</li>
                        <li>Commands</li>
                        <li>SecretChannel</li>
                    </ul>
                </aside>

                {/* Fenêtre de chat */}
                <section className={styles.chatWindow}>
                    {/* Titre du salon actif */}
                    <h2>Chat</h2>

                    {/* Zone d'affichage des messages */}
                    <div className={styles.messages}>
                        <div className={styles.message}>
                            <div className={styles.messageAvatar}>U1</div>
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>User1</span>
                                    <span className={styles.timestamp}>Today at 12:34 PM</span>
                                </div>
                                <div className={styles.messageText}>Hello Everyone!</div>
                            </div>
                        </div>
                        <div className={styles.message}>
                            <div className={styles.messageAvatar}>U2</div>
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>User2</span>
                                    <span className={styles.timestamp}>Today at 12:35 PM</span>
                                </div>
                                <div className={styles.messageText}>Hi there! How's it going?</div>
                            </div>
                        </div>
                    </div>

                    {/* Barre de saisie de message */}
                    <div className={styles.inputContainer}>
                        <textarea
                            className={styles.chatInput}
                            placeholder={`Message #Chat`}
                            rows={1}
                        />
                    </div>
                </section>

                {/* Liste des utilisateurs (membres du salon) */}
                <aside className={styles.userList}>
                    <h3>Online — 4</h3>
                    <ul>
                        <li>User1</li>
                        <li>User2</li>
                        <li>User3</li>
                        <li>User4</li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default Home;