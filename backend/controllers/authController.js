const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userQueries = require('../queries/userQueries');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const conn = await pool.getConnection();

  try {
    const lastLogin = null;
    await conn.query(userQueries.createUser, [name, email, hashed, role, lastLogin]);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    conn.release();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(userQueries.findUserByEmail, [email]);
    if (rows.length === 0) return res.status(400).json({ error: "No user found" });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    await conn.query(userQueries.updateLastLogin, [user.id]);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  } finally {
    conn.release();
  }
};

