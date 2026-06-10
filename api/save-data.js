import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {

    const body = req.body;

    if (body.config) {

      await supabase
        .from('settings')
        .upsert({
          id: 1,
          wa: body.config.wa
        });

    }

    if (body.products) {

      await supabase
        .from('products')
        .delete()
        .neq('id', 0);

      const rows = body.products.map(p => ({
        nama: p.nama,
        harga: p.harga,
        stok: p.stok,
        gambar: p.gambar
      }));

      if (rows.length) {
        await supabase
          .from('products')
          .insert(rows);
      }

    }

    return res.status(200).json({
      success: true
    });

  } catch (err) {

    return res.status(500).json({
      success: false,
      error: err.message
    });

  }
}
