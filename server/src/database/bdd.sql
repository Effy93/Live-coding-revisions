-- Création de la table user
CREATE database if not EXISTS livecoDB;
use livecoDB;

CREATE TABLE IF NOT EXISTS user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO user (email, firstName, lastName, password) VALUES
('alice.martin@example.com', 'Alice', 'Martin', 'password123'),
('bob.dupont@example.com', 'Bob', 'Dupont', 'azerty456'),
('clara.leroy@example.com', 'Clara', 'Leroy', 'clara2024'),
('david.moreau@example.com', 'David', 'Moreau', 'davidpass789'),
('emma.bernard@example.com', 'Emma', 'Bernard', 'emma_secure1'),
('lucas.robert@example.com', 'Lucas', 'Robert', 'lucas1234'),
('lea.petit@example.com', 'Léa', 'Petit', 'lea_password'),
('nathan.garcia@example.com', 'Nathan', 'Garcia', 'nathan999'),
('julie.fournier@example.com', 'Julie', 'Fournier', 'juliepass42'),
('hugo.mercier@example.com', 'Hugo', 'Mercier', 'hugo_test01');