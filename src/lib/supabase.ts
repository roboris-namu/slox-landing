import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtqpbyfgptuxwrevxxtm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0cXBieWZncHR1eHdyZXZ4eHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mzc0NDAsImV4cCI6MjA3MjIxMzQ0MH0.Oz8WPZFCo9IjmK0NYDSJmizHETX9yY8aezYkLjQCbxQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface LeaderboardEntry {
  id: string;
  nickname: string;
  score: number;
  grade: string;
  percentile: number;
  device_type: string;
  created_at: string;
  country?: string;
  user_id?: string; // 👤 회원이면 user_id 있음
}

