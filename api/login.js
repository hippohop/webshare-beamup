export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);

    const response = await fetch('https://webshare.cz/api/login/', {
      method: 'POST',
      body: form,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
}
