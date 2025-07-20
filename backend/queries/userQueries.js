module.exports = {
  createUser: `
    INSERT INTO users (name, email, password, role, last_login)
    VALUES (?, ?, ?, ?, ?)
  `,
  
  findUserByEmail: `
    SELECT id, name, email, password, role, last_login
    FROM users
    WHERE email = ?
  `,

  updateLastLogin: `
    UPDATE users
    SET last_login = NOW()
    WHERE id = ?
  `
};
