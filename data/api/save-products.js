export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const products = req.body;

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const path = "data/products.json";

  const getFile = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const current = await getFile.json();

  const update = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update products",
        content: Buffer.from(
          JSON.stringify(products, null, 2)
        ).toString("base64"),
        sha: current.sha
      })
    }
  );

  const result = await update.json();

  res.status(200).json(result);
}
