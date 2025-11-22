
import { createClient } from '@supabase/supabase-js';

// Using provided credentials directly to fix "Failed to fetch"
const supabaseUrl = "https://afllsfnzqlmofuuujdqg.supabase.co";
const supabaseAnonKey = "sb_publishable_euMcYwx7BKN3aDHl0dfGCg_CqE4_SUa";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
