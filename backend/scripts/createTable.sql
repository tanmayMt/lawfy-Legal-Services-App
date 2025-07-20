create database lawfy_Legal_Services_app;
use lawfy_Legal_Services_app;
-- Users table: for both lawyers and clients
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('lawyer', 'client','admin') NOT NULL,
  last_login DATETIME
);

-- Clients table: specific to client details
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, -- references users(id)
  lawyer_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lawyer_id) REFERENCES users(id)
);

-- Cases table
CREATE TABLE cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  lawyer_id INT,
  client_id INT,
  status ENUM('active', 'closed', 'pending', 'on_hold', 'rejected', 'in_review') DEFAULT 'pending',
  FOREIGN KEY (lawyer_id) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES users(id)
);




-- Lawyers
INSERT INTO users (name, email, password, role, last_login) VALUES
('Lawyer A', 'lawyerA@example.com', 'pass', 'lawyer', '2025-07-16 10:00:00'),
('Lawyer B', 'lawyerB@example.com', 'pass', 'lawyer', '2025-07-17 09:30:00'),
('Lawyer C', 'lawyerC@example.com', 'pass', 'lawyer', '2025-07-15 11:00:00');

-- Clients
INSERT INTO users (name, email, password, role, last_login) VALUES
('Client X', 'clientX@example.com', 'pass', 'client', '2025-07-17 11:00:00'),
('Client Y', 'clientY@example.com', 'pass', 'client', '2025-07-17 11:15:00'),
('Client Z', 'clientZ@example.com', 'pass', 'client', '2025-07-17 11:30:00');

INSERT INTO clients (user_id, lawyer_id) VALUES
(4, 1), -- Client X → Lawyer A
(5, 1), -- Client Y → Lawyer A
(6, 2); -- Client Z → Lawyer B

-- Lawyer A has 6 active cases
INSERT INTO cases (title, lawyer_id, client_id, status) VALUES
('Case 1', 1, 4, 'active'),
('Case 2', 1, 4, 'active'),
('Case 3', 1, 4, 'active'),
('Case 4', 1, 5, 'active'),
('Case 5', 1, 5, 'active'),
('Case 6', 1, 5, 'active');

-- Lawyer B has 3 active cases
INSERT INTO cases (title, lawyer_id, client_id, status) VALUES
('Case 7', 2, 6, 'active'),
('Case 8', 2, 6, 'active'),
('Case 9', 2, 6, 'active');
