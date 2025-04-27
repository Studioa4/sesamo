// /controllers/creaUtenteController.js

import axios from 'axios';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL + '/rest/v1/';
const supabaseApiKey = process.env.SUPABASE_ANON_KEY;

export async function creaUtente(req, res) {
  const { nome, cognome, cellulare, email, password, ruolo } = req.body;

  if (!nome || !cognome || !cellulare || !email || !password || !ruolo) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await axios.post(
      supabaseUrl + 'utenti',
      [
        {
          nome,
          cognome,
          cellulare,
          email,
          password_hash: hashedPassword,
          ruolo,
          attivo: true,
          superadmin: false
        }
      ],
      {
        headers: {
          apikey: supabaseApiKey,
          Authorization: `Bearer ${supabaseApiKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation" // ✅ Importantissimo!
        }
      }
    );

    res.status(201).json({ message: 'Utente creato con successo!', utente: response.data[0] });
  } catch (err) {
    console.error('Errore dettagliato Supabase:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore creazione utente' });
  }
}
