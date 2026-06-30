import { createClient } from '@supabase/supabase-js';

// Change this line in your image_81cf95.png file
const supabaseUrl = 'https://awdjnalpzpagmdvajoha.supabase.co';
const supabaseAnonKey = 'sb_publishable_OSHX7H5DfDR9F3ottCUbyQ_2EaokKou';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);