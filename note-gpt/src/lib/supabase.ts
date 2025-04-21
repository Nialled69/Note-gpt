import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.Url!
const supabaseAnonKey = process.env.anonKey!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)