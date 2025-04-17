import React from "react";
import styles from "./css/home.module.css";

function Home() {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    // const handleChannelSelect = (channelName) => {
    //     // Logique de changement de channel ici
    // };

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
                    <ul className={styles.channelList}>
                        {/* Ci dessous un exemple du fonctionnement de la selection des channels.
                        À adapter en fonction de comment on fait le reste...
                        <li
                            key={channel}
                            onClick={() => handleChannelSelect(channel)}
                            className={selectedChannel === channel ? styles.active : ''}
                        >
                            {channel}
                        </li> */}
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
                            <div className={`${styles.messageAvatar} ${styles.user}`} />
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>IronTron1</span>
                                    <span className={styles.timestamp}>Today at 12:34 PM</span>
                                </div>
                                <div className={styles.messageText}>Salut les copains</div>
                            </div>
                        </div>
                        <div className={styles.message}>
                            <div className={`${styles.messageAvatar} ${styles.user}`} />
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>Wizoo</span>
                                    <span className={styles.timestamp}>Today at 12:35 PM</span>
                                </div>
                                <div className={styles.messageText}>Wesh je me suis fais retirer mon permis</div>
                            </div>
                        </div>
                        <div className={`${styles.message} ${styles.ownMessage}`}>
                            <div className={`${styles.messageAvatar} ${styles.me}`} />
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>TokyoBoyVS</span>
                                    <span className={styles.timestamp}>Today at 12:35 PM</span>
                                </div>
                                <div className={styles.messageText}>Ohh bah tu sais Lucien bebou c'est ca que ca fait de conduire comme un malade.</div>
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
                    <ul className={styles.userList}>
                        <li>IronTron1</li>
                        <li>TokyoBoyVS</li>
                        <li>Wizoo</li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default Home;