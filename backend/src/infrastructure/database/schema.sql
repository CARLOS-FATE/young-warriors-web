CREATE DATABASE IF NOT EXISTS young_warriors_db;
USE young_warriors_db;

CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(2048),
    height VARCHAR(50),
    weight VARCHAR(50),
    ppg DECIMAL(4, 1) DEFAULT 0,
    rpg DECIMAL(4, 1) DEFAULT 0,

    apg DECIMAL(4, 1) DEFAULT 0,
    tactical_stats JSON,
    stats_history JSON,
    dni VARCHAR(20),
    phone VARCHAR(20),
    emergency_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP


);

CREATE TABLE IF NOT EXISTS coaches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    imageUrl VARCHAR(2048),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    authorId INT,
    publishedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'coach', 'player') NOT NULL DEFAULT 'player',
    related_id INT, -- Links to players.id or coaches.id
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS ad_videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    video_url VARCHAR(2048) NOT NULL,
    platform VARCHAR(50) DEFAULT 'other',
    is_active BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pricing_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    period VARCHAR(100),
    category ENUM('matricula', 'mensualidad', 'promo') NOT NULL,
    description TEXT,
    features TEXT,
    highlight BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    coach_id INT,
    date DATE NOT NULL,
    status ENUM('present', 'absent', 'excused', 'late') DEFAULT 'present',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (coach_id) REFERENCES coaches(id) ON DELETE CASCADE
);


INSERT INTO players (name, position) VALUES ('Lionel Messi', 'Forward'), ('Cristiano Ronaldo', 'Forward');
INSERT INTO coaches (name, role) VALUES ('Pep Guardiola', 'Head Coach');
