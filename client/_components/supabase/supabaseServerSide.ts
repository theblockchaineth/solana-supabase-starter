import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  const auth_cookie = cookieStore.get(process.env.SUPABASE_TOKEN_COOKIENAME!)

  console.log(auth_cookie?.value)

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {  
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
        },
      },
      global: {
        headers: {
          Authorization: `Bearer ${auth_cookie?.value}`
        }
      }
    },
  )
}