import React, { useState, useRef, useEffect } from "react";
import styles from "./css/home.module.css";
import seekflowLogo from "./assets/seekflow.png"

function Home() {
        // User connected
        const user = sessionStorage.getItem("username");
        const API_URL = 'https://api.m306.ch/api/chat/messages';
    
        // Array list users
        const users = [
            "IronTron1",
            "TokyoBoyVS",
            "Wizoo",
            user
        ].filter(Boolean);
    
        // --- STATE FOR MESSAGES + INPUT ---
        const [messages, setMessages] = useState([]);
        const [input, setInput] = useState("");
        const [isLoading, setIsLoading] = useState(true);
    
        // --- REFERENCES FOR AUTO-SCROLL + AUTO-FOCUS ---
        const messagesRef = useRef(null);
        const inputRef = useRef(null);
    
        // --- FETCH MESSAGES FROM API ---
        const fetchMessages = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch messages');
                const data = await response.json();
                
                // Convert API messages to your format
                const formattedMessages = data.map(msg => ({
                    author: msg.author,
                    content: msg.text,
                    timestamp: new Date(msg.timestamp)
                }));
                
                // Combine with initial messages if needed
                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        // --- INITIAL LOAD ---
        useEffect(() => {
            fetchMessages();
        }, []);
    
        // --- SEND MESSAGE HANDLER ---
        const handleSend = async (e) => {
            if (e) e.preventDefault();
            if (!input.trim()) return;
        
            // Création du message avec un ID unique pour mieux gérer le rollback
            const tempId = Date.now(); // ID temporaire pour le message
            const newMsg = {
                tempId, 
                author: user,
                text: input.trim(),
                timestamp: new Date()
            };
        
            try {
                // 1. Mise à jour optimiste UI
                setMessages(prev => [...prev, newMsg]);
                setInput("");
                
                // 2. Récupération du token
                const authToken = localStorage.getItem("authToken");
                if (!authToken) {
                    throw new Error('Authentication token missing');
                }
        
                // 3. Envoi à l'API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: JSON.stringify({
                        author: newMsg.author,
                        content: newMsg.text,
                        timestamp: newMsg.timestamp.toISOString()
                    })
                });
        
                // 4. Gestion des erreurs HTTP
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Échec de l\'envoi du message');
                }
        
                // 5. Rechargement des messages après succès
                await fetchMessages();
        
            } catch (error) {
                console.error("Erreur d'envoi:", error);
                
                // 6. Rollback plus précis avec tempId
                setMessages(prev => prev.filter(msg => msg.tempId !== tempId));
                
                // 7. Gestion des erreurs spécifiques
                if (error.message.includes('token') || error.message.includes('authentification')) {
                    // Redirection vers login si problème d'authentification
                    window.location.href = '/login?error=session_expired';
                } else {
                    // Affichage d'une notification à l'utilisateur
                    alert(`Message non envoyé: ${error.message}`);
                }
            } finally {
                // 8. Remise du focus et reset de la hauteur du textarea
                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.style.height = 'auto';
                }
            }
        };
    
        // --- AUTO-SCROLL ---
        useEffect(() => {
            messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
        }, [messages]);
    
        // --- LOGOUT HANDLER ---
        const handleLogout = () => {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        };
    
        if (isLoading) {
            return <div>Loading messages...</div>;
        }
    // --- RENDER ---
    return (
        <div className={styles.homeContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <img src={seekflowLogo} alt="Seekflow logo" className={styles.seekflowLogo} />
                    <span>Seekflow</span>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                    Déconnexion
                </button>
            </header>

            {/* Main content : aside left (channels), chat in th emiddle, aside right (users) */}
            <div className={styles.mainContent}>
                <aside className={styles.channelList}>
                    <ul className={styles.channelList}>
                        {/* Below an example of how we could handle the channel switch.

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

                {/* Chat flow where all the messages appear with messages "bubbles" and the PFPs */}
                <section className={styles.chatWindow}>
            <h2>Chat</h2>
            
            <div className={styles.messages} ref={messagesRef}>
                {messages.map((msg, i) => {
                    const isOwn = msg.author === user;
                    return (
                        <div key={i} className={`${styles.message} ${isOwn ? styles.ownMessage : ""}`}>
                            <div className={`${styles.messageAvatar} ${isOwn ? styles.me : styles.user}`} />
                            <div className={styles.messageContent}>
                                <div className={styles.messageHeader}>
                                    <span className={styles.author}>{msg.author}</span>
                                    <span className={styles.timestamp}>
                                        Today at{" "}
                                        {msg.timestamp.toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}
                                    </span>
                                </div>
                                <div className={styles.messageText}>{msg.text}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Zone d'envoi (identique à ton code original) */}
            <div className={styles.inputContainer}>
                <textarea
                    ref={inputRef}
                    className={styles.chatInput}
                    placeholder="Message #Chat"
                    rows={1}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onInput={e => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            handleSend(e);
                        }
                    }}
                />
                <button
                    type="button"
                    className={styles.sendButton}
                    onClick={handleSend}
                    disabled={!input.trim()}
                >
                    Send <span className={styles.sendArrow}>→</span>
                </button>
            </div>
        </section>

                {/* List of user (channel members) */}
                {/* TODO : make the list dynamically loads depending on who's on the channel */}
                <aside className={styles.userList}>
  <h3>Online — {users.length}</h3>
  <ul className={styles.userList}>
    {users.map((user, index) => (
      <li key={index}>{user}</li>
    ))}
  </ul>
</aside>
            </div>
        </div>
    );
}

export default Home;
