import { createClient } from '@supabase/supabase-js'

const URL = 'https://yriitlvfhuvnvawvzgyi.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaWl0bHZmaHV2bnZhd3Z6Z3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyOTA0MjQsImV4cCI6MjAyOTg2NjQyNH0.IPiZsxy6K5niz84EKSqoyikrZAQRuO2s6oOptHidY24';

export const supabase = createClient(URL, API_KEY);