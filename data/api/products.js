export default async function handler(req, res) {
  const url =
    "https://raw.githubusercontent.com/alphathauri/Katalog-Agres-Id-Cileungsi-/main/data/products.json";

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
