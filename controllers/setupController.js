import axios from 'axios';
import bcrypt from 'bcrypt';

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1',
  headers: {
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`, // solo questo basta
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  }
});

export async function createImpianto(req, res) {
  const { nome, codice_attivazione, cellulare, password } = req.body;

  try {
    const impiantoRes = await supabase.post('/sesamo.impianti', {
      nome,
      codice_attivazione
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await supabase.post('/sesamo.utenti', {
      impianto_id: impiantoRes.data[0].id,
      ruolo: 'amministratore',
      cellulare,
      password_hash: hashedPassword
    });

    res.status(201).json({ message: 'Impianto e amministratore creati con successo' });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Errore nella creazione impianto' });
  }
}
