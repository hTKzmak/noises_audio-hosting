import { createClient } from '@supabase/supabase-js'
import { Database } from './database_types'

// подключение ссылки и ключа с .env
const supabaseUrl = 'https://evapkmvcgowyfwuogwbq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YXBrbXZjZ293eWZ3dW9nd2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2ODU5NDUsImV4cCI6MjA1NjI2MTk0NX0.T8AfoZjSZHWq_1dDcNAYlb5MOjOecioW36HX9Bd5aWA'

// подключение supabase
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase