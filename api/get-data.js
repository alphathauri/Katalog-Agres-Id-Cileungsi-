import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {

  const { data: products } =
    await supabase
      .from('products')
      .select('*')
      .order('id');

  const { data: settings } =
    await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();

  res.status(200).json({
    config: {
      wa: settings?.wa || ''
    },
    products: products || []
  });
}
