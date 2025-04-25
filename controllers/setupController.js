const pool = require('../db/db');
const bcrypt = require('bcrypt');

exports.createImpianto = async (req, res) => {
  const { nome, codice_attivazione, cellulare, password } = req.body;

  try {
    const client = await pool.connect();
    const hashed = await bcrypt.hash(password, 10);

    await client.query('BEGIN');
    const impianto = await client.query(
      'INSERT INTO sesamo.impianti (nome, codice_attivazione) VALUES ($1, $2) RETURNING *',
      [nome, codice_attivazione]
    );

    const utente = await client.query(
      'INSERT INTO sesamo.utenti (impianto_id, ruolo, cellulare, password_hash) VALUES ($1, $2, $3, $4)',
      [impianto.rows[0].id, 'amministratore', cellulare, hashed]
    );

    await client.query('COMMIT');
    client.release();
    res.status(201).json({ message: 'Impianto e amministratore creati con successo' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nella creazione impianto' });
  }
};