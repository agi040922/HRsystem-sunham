import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface BoardPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  author_name: string
  views: number
  is_published: boolean
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface BoardImage {
  id: number
  post_id: number
  image_url: string
  alt_text: string | null
  display_order: number
  created_at: string
}

// AI 상담 관련 타입 정의
export interface AIConsultation {
  id: number
  session_id: string
  user_name?: string
  user_email?: string
  user_phone?: string
  category?: string
  initial_query: string
  consultation_type: 'search' | 'keyword' | 'form'
  status: 'active' | 'completed' | 'abandoned'
  satisfaction_score?: number
  admin_notes?: string
  follow_up_required: boolean
  created_at: string
  updated_at: string
}

export interface AIMessage {
  id: number
  consultation_id: number
  sender_type: 'user' | 'ai' | 'system'
  content: string
  metadata?: any
  timestamp: string
}

export interface ConsultationCategory {
  id: number
  name: string
  display_name: string
  description?: string
  keywords?: string[]
  form_template?: any
  color: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ConsultationFeedback {
  id: number
  consultation_id: number
  rating: number
  feedback_text?: string
  improvement_suggestions?: string
  would_recommend?: boolean
  created_at: string
} 