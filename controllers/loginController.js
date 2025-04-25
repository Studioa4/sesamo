const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { cellulare, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM sesamo.utenti WHERE cellulare = $1 AND attivo = true',
      [cellulare]
    );

    if (result.rows.length === 0) return res.status(401).json({ error: 'Utente non trovato' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) return res.status(403).json({ error: 'Password errata' });

    const token = jwt.sign({ id: user.id, ruolo: user.ruolo }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel login' });
  }
};