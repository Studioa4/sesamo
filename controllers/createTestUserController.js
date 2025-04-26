// /controllers/createTestUserController.js

import axios from 'axios';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1/',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`
  }
});

export async function createTestUser(req, res) {
  try {
    const nuovaPassword = '123456';
    const hashedPassword = await bcrypt.hash(nuovaPassword, 10);

    const userData = {
      nome: 'Fabrizio',
      cognome: 'SuperAdmin',
      cellulare: '+393331112233',
      email: 'fabrizio@email.com',
      password_hash: hashedPassword,
      attivo: true
    };

    const { data, error } = await supabase.post('utenti', userData);

    if (error) {
      console.error('Errore creazione utente:', error);
      return res.status(500).json({ error: 'Errore creazione utente' });
    }

    res.status(200).json({ message: 'Utente creato con successo!', utente: data[0] });
  } catch (err) {
    console.error('Errore:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore interno server' });
  }
}
