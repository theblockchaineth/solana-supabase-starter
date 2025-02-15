'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useCookies } from 'next-client-cookies';

export function createClient() {
  const cookies = useCookies();
  const auth_cookie = cookies.get(process.env.SUPABASE_TOKEN_COOKIENAME!)

  if(!auth_cookie) {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  } else {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {      
      global: {
          headers: {
            Authorization: `Bearer ${auth_cookie}`
          }
        }
      })
    }
  }