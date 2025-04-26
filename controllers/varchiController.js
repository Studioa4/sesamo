// /controllers/varchiController.js

import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1/',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`
  }
});

export async function getVarchi(req, res) {
  try {
    const { data } = await supabase.get('accessi_configurati', {
      params: { select: 'id,nome_accesso,tipo,comando' }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('Errore caricamento varchi:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore caricamento varchi' });
  }
}
