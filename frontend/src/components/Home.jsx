import React, { useState, useRef, useEffect } from "react";
import styles from "./css/home.module.css";
import seekflowLogo from "./assets/seekflow.png";

function Home() {
  const user    = sessionStorage.getItem("username");
  const API_URL = "https://api.m306.ch/api/chat/messages";
  const USERS_URL = "https://api.m306.ch/api/chat/users";

  // — États —
  const [messages, setMessages] = useState([]);
  const [users, setUsers]       = useState([]);
  const [input, setInput]       = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState(null);

  // — Refs —
  const messagesRef = useRef(null);
  const inputRef    = useRef(null);

  // — Déconnexion —
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  // — Récupère les messages JSON, mappe { sender, text, timestamp } —
  const fetchMessages = async () => {
    try {
      const res  = await fetch(API_URL);
      const text = await res.text();
      const ct   = res.headers.get("content-type") || "";
      if (!ct.includes("application/json")) {
        throw new Error("Le serveur n’a pas renvoyé du JSON pour les messages.");
      }
      const data = JSON.parse(text);
      setMessages(
        data.map(msg => ({
          sender:    msg.sender,
          text:      msg.content,
          timestamp: new Date(msg.timestamp),
        }))
      );
    } catch (err) {
      console.error("fetchMessages error:", err);
      setError("Impossible de charger les messages.");
    } finally {
      setIsLoading(false);
    }
  };

  // — Tente de récupérer via l’API users, sinon fallback sur les messages —
  const fetchUsers = async () => {
    try {
      const res = await fetch(USERS_URL);
      if (res.status === 404) {
        console.warn("Users endpoint not found, deriving from messages");
        return;
      }
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      const online = data
        .filter(u => u.isOnline)
        .map(u => u.username || u.sender);
      setUsers(online);
    } catch (err) {
      console.error("fetchUsers error:", err);
      // pas de setError ici, fallback below
    }
  };

  // — Envoi optimiste + POST content →
  const handleSend = async e => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const tempId = Date.now();
    const newMsg = { tempId, sender: user, text: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token non trouvé");

      const res = await fetch(API_URL, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender:    user,
          content:   input.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      const raw = await res.text();
      const ct  = res.headers.get("content-type") || "";
      let data;
      if (ct.includes("application/json")) data = JSON.parse(raw);

      if (!res.ok) {
        const msg = data?.message || raw || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      await fetchMessages();
    } catch (err) {
      console.error("handleSend error:", err);
      setMessages(prev => prev.filter(m => m.tempId !== tempId));
      setError(err.message);
    }
  };

  // — Montage : polling messages + users —
  useEffect(() => {
    fetchMessages();
    fetchUsers();

    const msgInterval  = setInterval(fetchMessages, 1);
    const userInterval = setInterval(fetchUsers, 1);

    return () => {
      clearInterval(msgInterval);
      clearInterval(userInterval);
    };
  }, []);

  // — Si fetchUsers a planté ou 404, on dérive la liste depuis les messages —
  useEffect(() => {
    if (users.length === 0) {
      const derived = Array.from(new Set(messages.map(m => m.sender)));
      setUsers(derived);
    }
  }, [messages, users]);

  // — Scroll auto sur nouveaux messages —
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top:      messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // — UI loading / erreur —
  if (isLoading) return <div className={styles.loading}>Chargement en cours...</div>;
  if (error)     return <div className={styles.error}>{error}</div>;

  // — Render final —
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={seekflowLogo} alt="Seekflow logo" className={styles.seekflowLogo} />
          <span>Seekflow</span>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Déconnexion
        </button>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.channelList}>
          <ul>
            <li className={styles.active}>Chat</li>
            <li>Images</li>
            <li>Commands</li>
            <li>SecretChannel</li>
          </ul>
        </aside>

        <section className={styles.chatWindow}>
          <h2>Chat</h2>
          <div className={styles.messages} ref={messagesRef}>
            {messages.map((msg, i) => {
              const isOwn = msg.sender === user;
              return (
                <div key={i} className={`${styles.message} ${isOwn ? styles.ownMessage : ""}`}>
                  <div className={`${styles.messageAvatar} ${isOwn ? styles.me : styles.user}`} />
                  <div className={styles.messageContent}>
                    <div className={styles.messageHeader}>
                      <span className={styles.author}>{msg.sender}</span>
                      <span className={styles.timestamp}>
                        {msg.timestamp.toLocaleDateString()} –{" "}
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className={styles.messageText}>{msg.text}</div>
                  </div>
                </div>
              );
            })}
          </div>

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
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend(e)}
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

        <aside className={styles.userList}>
          <h3>Online — {users.length}</h3>
          <ul>
            {users.map((u, idx) => (
              <li key={idx}>{u}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default Home;