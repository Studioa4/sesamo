import axios from 'axios';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1/',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`
  }
});

export async function createImpianto(req, res) {
  const { nome, codice_attivazione, cellulare, password } = req.body;

  try {
    const impiantoRes = await supabase.post('impianti', {
      nome,
      codice_attivazione
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await supabase.post('utenti', {
      impianto_id: impiantoRes.data[0].id,
      ruolo: 'amministratore',
      cellulare,
      password_hash: hashedPassword
    });

    res.status(201).json({ message: 'Impianto e amministratore creati con successo' });
  } catch (err) {
    console.error('Errore completo:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Errore nella creazione impianto' });
  }
}
