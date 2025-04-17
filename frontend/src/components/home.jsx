import React, { useState, useRef, useEffect } from "react";
import styles from "./css/home.module.css";
import seekflowLogo from "./assets/seekflow.png"

function Home() {
    // --- STATE FOR MESSAGES + INPUT ---
    const [messages, setMessages] = useState([
        { author: "IronTron1", text: "Salut les copains", timestamp: new Date("2025-04-17T12:34:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "IronTron1", text: "Salut les copains", timestamp: new Date("2025-04-17T12:34:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") },
        { author: "Wizoo", text: "Wesh je me suis fais retirer mon permis", timestamp: new Date("2025-04-17T12:35:00") }
    ]);
    const [input, setInput] = useState("");

    // --- REFERENCES FOR AUTO-SCROLL + AUTO-FOCUS ---
    const messagesRef = useRef(null);
    const inputRef = useRef(null);

    // --- LOGOTU HANDLER ---
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    // const handleChannelSelect = (channelName) => {
    //     // TODO : channel change logic here
    // };

    // --- SEND HANDLER ---
    const handleSend = (e) => {
        if (e) e.preventDefault();  // empêche le saut de ligne quand on appuyes sur enter
        if (!input.trim()) return;
        const newMsg = {
            author: "TokyoBoyVS",   // TODO : replace with the dynamic variable containing (own) username
            text: input.trim(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        // TODO: send over WebSocket here

        inputRef.current?.focus();  // garde le focus sur la textarea
    };

    // --- AUTO-SCROLL
    useEffect(() => {
        const el = messagesRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages])

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
                {/* Channels list */}
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
                            const isOwn = msg.author === "TokyoBoyVS";
                            return (
                                <div
                                    key={i}
                                    className={`${styles.message} ${isOwn ? styles.ownMessage : ""}`}
                                >
                                    <div
                                        className={`${styles.messageAvatar} ${isOwn ? styles.me : styles.user}`}
                                    />
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

                    {/* Input area (input box, send button, maybe later attach files button) */}
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
                        >
                            Send <span className={styles.sendArrow}>→</span>
                        </button>
                    </div>
                </section>

                {/* List of user (channel members) */}
                {/* TODO : make the list dynamically loads depending on who's on the channel */}
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