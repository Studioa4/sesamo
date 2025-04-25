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
  const { nome, cognome, cellulare, email, impianto_nome, codice_attivazione, password } = req.body;

  try {
    // 1. Crea l'utente amministratore
    const hashedPassword = await bcrypt.hash(password, 10);

    const utenteRes = await supabase.post('utenti', {
      nome,
      cognome,
      cellulare,
      email
    });

    const utente_id = utenteRes.data[0].id;

    // 2. Crea l'impianto collegato all'amministratore
    const impiantoRes = await supabase.post('impianti', {
      nome: impianto_nome,
      codice_attivazione
    });

    const impianto_id = impiantoRes.data[0].id;

    // 3. Crea l'associazione amministratore-impianto in utenti_varchi
    await supabase.post('utenti_varchi', {
      utente_id: utente_id,
      impianto_id: impianto_id,
      accesso_id: null, -- Nessun varco specifico inizialmente
      ruolo: 'amministratore',
      giorni_consentiti: null,
      ora_inizio: null,
      ora_fine: null,
      creato_da: null
    });

    res.status(201).json({ message: 'Impianto e amministratore creati con successo' });
  } catch (err) {
    console.error('Errore completo:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Errore nella creazione impianto' });
  }
}