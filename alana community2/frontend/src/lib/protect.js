import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabaseServer';

export async function protectPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}
