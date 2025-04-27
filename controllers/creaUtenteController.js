// /controllers/creaUtenteController.js

import axios from 'axios';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1/',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation" // ✅ Aggiunto per risposta dopo inserimento
  }
});

export async function creaUtente(req, res) {
  const { nome, cognome, cellulare, email, password, ruolo } = req.body;

  if (!nome || !cognome || !cellulare || !email || !password || !ruolo) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await supabase.post('utenti', [
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
    ]);

    res.status(201).json({ message: 'Utente creato con successo!', utente: response.data[0] });
  } catch (err) {
    console.error('Errore creazione utente:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore creazione utente' });
  }
}
