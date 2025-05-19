import { createClient } from '@supabase/supabase-js'

// Explicitly declare the environment variables
declare const VITE_SUPABASE_URL: string
declare const VITE_SUPABASE_SERVICE_KEY: string

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file or Vercel environment variables.')
}

// Create a Supabase client with the service key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}) 