import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: () => { /* δεν χρειάζεσαι set εδώ αν απλά διαβάζεις */ },
      delete: () => { /* προαιρετικό */ },
    },
  });

  return supabase;
}
