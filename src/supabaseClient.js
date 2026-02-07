import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iexqpxjphebvqscpjwev.supabase.co'
const supabaseKey = 'sb_publishable_80HUhz6DqPGFwvF33CCfZg_XM4FjyQy' // Extracted from user image

export const supabase = createClient(supabaseUrl, supabaseKey)
