import axios from 'axios';

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  }
});

export async function logAccesso(req, res) {
  const { accesso_id, utente_id, note } = req.body;

  try {
    const result = await supabase.post('/sesamo.accessi_log', {
      accesso_id,
      utente_id,
      note
    });
    res.status(201).json(result.data[0]);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Errore nella registrazione accesso' });
  }
}

export async function getAccessi(req, res) {
  try {
    const { data } = await supabase.get('/sesamo.accessi_log', {
      params: { select: '*' }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Errore nel recupero accessi' });
  }
}