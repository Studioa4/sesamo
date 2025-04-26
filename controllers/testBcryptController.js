// /controllers/testBcryptController.js

import bcrypt from 'bcryptjs';

export async function testBcrypt(req, res) {
  const { password, password_hash } = req.body;

  if (!password || !password_hash) {
    return res.status(400).json({ error: 'Password o hash mancanti' });
  }

  try {
    const valid = await bcrypt.compare(password, password_hash);
    if (valid) {
      res.status(200).json({ message: 'Password corretta, match OK!' });
    } else {
      res.status(401).json({ error: 'Password NON corretta!' });
    }
  } catch (err) {
    console.error('Errore bcrypt compare:', err.response?.data || err.message);
    res.status(500).json({ error: 'Errore bcrypt interno' });
  }
}
