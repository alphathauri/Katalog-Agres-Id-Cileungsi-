export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { type, data } = req.body;
  const binId = type === 'config'
    ? process.env.JSONBIN_CONFIG_BIN
    : process.env.JSONBIN_PRODUCTS_BIN;

  if (!binId) return res.status(400).json({ error: 'Unknown type' });

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': process.env.JSONBIN_API_KEY
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  res.status(200).json({ ok: true, result });
}
