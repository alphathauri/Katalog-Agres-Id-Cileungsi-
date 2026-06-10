export default async function handler(req, res) {
  const { type } = req.query;
  const binId = type === 'config'
    ? process.env.JSONBIN_CONFIG_BIN
    : process.env.JSONBIN_PRODUCTS_BIN;

  if (!binId) return res.status(400).json({ error: 'Unknown type' });

  const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
    headers: { 'X-Master-Key': process.env.JSONBIN_API_KEY }
  });

  const data = await response.json();
  res.status(200).json(data.record);
}
