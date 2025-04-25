import axios from 'axios';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const supabase = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1/',
  headers: {
    apikey: process.env.SUPABASE_ANON_KEY,
    Prefer: 'return=representation'  
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

    const utente_id = utenteRes.data?.[0]?.id;
    console.log('✅ Utente creato:', utente_id);

    if (!utente_id) {
      throw new Error("Utente non creato correttamente");
    }

    // 2. Crea l'impianto
    const impiantoRes = await supabase.post('impianti', {
      nome: impianto_nome,
      codice_attivazione
    });

    const impianto_id = impiantoRes.data?.[0]?.id;
    console.log('✅ Impianto creato:', impianto_id);

    if (!impianto_id) {
      throw new Error("Impianto non creato correttamente");
    }

    // 3. Collega utente e impianto come amministratore
    const collegamento = await supabase.post('utenti_varchi', {
      utente_id: utente_id,
      impianto_id: impianto_id,
      accesso_id: null,
      ruolo: 'amministratore',
      giorni_consentiti: null,
      ora_inizio: null,
      ora_fine: null,
      creato_da: null
    });

    console.log('✅ Collegamento utenti_varchi creato:', collegamento.data);

    res.status(201).json({ message: 'Impianto e amministratore creati con successo' });

  } catch (err) {
    console.error('❌ Errore dettagliato:', JSON.stringify(err.response?.data || err.message || err, null, 2));
    res.status(500).json({ error: 'Errore nella creazione impianto' });
  }
}