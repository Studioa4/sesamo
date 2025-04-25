const pool = require('../db/db');

exports.logAccesso = async (req, res) => {
  const { accesso_id, utente_id, note } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO sesamo.accessi_log (accesso_id, utente_id, note) VALUES ($1, $2, $3) RETURNING *',
      [accesso_id, utente_id, note]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella registrazione accesso' });
  }
};

exports.getAccessi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sesamo.accessi_log ORDER BY orario DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel recupero accessi' });
  }
};