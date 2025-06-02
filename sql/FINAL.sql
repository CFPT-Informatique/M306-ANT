-- Supprime proprement l'ancienne base
DROP DATABASE IF EXISTS seekflow;

-- Crée une nouvelle base
CREATE DATABASE seekflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilise cette base
USE seekflow;

-- Crée un utilisateur (si besoin)
DROP USER IF EXISTS 'pomme'@'localhost';
CREATE USER 'pomme'@'localhost' IDENTIFIED BY 'pJprgTXvNHus';
GRANT ALL PRIVILEGES ON seekflow.* TO 'pomme'@'localhost';
FLUSH PRIVILEGES;

-- Table des utilisateurs
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    recipient_id INT,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE SET NULL
);
