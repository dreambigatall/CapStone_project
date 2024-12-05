import { createClient } from '@supabase/supabase-js'


 
 

export const supabaseUrl = 'https://znikiymccixmabrhrcux.supabase.co'
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaWtpeW1jY2l4bWFicmhyY3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMTQ2NzIsImV4cCI6MjA0ODc5MDY3Mn0.VfKOLnKqbf7kcUO48izDgwOnleBmDY4UbANOsx6YlCQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;