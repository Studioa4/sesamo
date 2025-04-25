SESAMO API REST - VERSIONE FINALE

API disponibili:
- POST /api/setup    -> Creazione impianto + amministratore
- POST /api/login    -> Login cellulare + password
- POST /api/accessi  -> Registrazione accesso
- GET /api/accessi   -> Lista accessi registrati

Database collegato via Supabase REST API, compatibile Vercel.

Configurare .env.production:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- JWT_SECRET