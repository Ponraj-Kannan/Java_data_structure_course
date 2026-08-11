import { createClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string) || ''
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || ''

const supabaseUrl =
  rawUrl && !rawUrl.includes('YOUR_PROJECT')
    ? rawUrl
    : 'https://abwglswctneuuroegfur.supabase.co'

const supabaseAnonKey =
  rawKey && !rawKey.includes('YOUR_ANON_KEY')
    ? rawKey
    : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2dsc3djdG5ldXVyb2VnZnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0MjYyNjEsImV4cCI6MjEwMjAwMjI2MX0.IfoNZ7Xg18QdLbzzKXr9SNybNW_oDH1AzWrriLQReek'

export const isSupabaseConfigured = true

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
