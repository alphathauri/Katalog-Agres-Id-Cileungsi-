export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {

    const body = req.body;

    return res.status(200).json({
      success: true,
      received: body
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
}
