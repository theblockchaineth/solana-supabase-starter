'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteSupabaseCookie(): Promise<void> {

    const cookieName = process.env.NEXT_PUBLIC_SUPABASE_TOKEN_COOKIENAME;
    const cookieStore = await cookies();
    cookieStore.delete(cookieName!);
    
}