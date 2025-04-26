// /controllers/resetPasswordController.js

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

export async function resetPassword(req, res) {
  const { cellulare } = req.body;

  if (!cellulare) {
    return res.status(400).json({ error: 'Cellulare mancante' });
  }

  try {
    const nuovaPassword = '123456';
    const hashedPassword = await bcrypt.hash(nuovaPassword, 10);

    const { data, error } = await supabase.patch('utenti', {
      password_hash: hashedPassword
    }, {
      params: { cellulare: `eq.${cellulare}` }
    });

    if (error) {
      console.error('Errore update password:', error);
      return res.status(500).json({ error: 'Errore aggiornamento password' });
    }

    res.status(200).json({ message: 'Password resettata a 123456!' });
  } catch (err) {
    console.error('Errore reset password:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore nel reset password' });
  }
}
