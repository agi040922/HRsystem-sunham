import { supabase } from './supabase'

export interface Newsletter {
  id: number
  title: string
  description: string | null
  cover_image_url: string | null
  file_url: string
  file_size: number | null
  language: 'ko' | 'en'
  published_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface NewsletterCreateData {
  title: string
  description?: string
  cover_image_url?: string
  file_url: string
  file_size?: number
  language: 'ko' | 'en'
  published_date: string
  is_active?: boolean
}

export interface NewsletterUpdateData {
  title?: string
  description?: string
  cover_image_url?: string
  file_url?: string
  file_size?: number
  language?: 'ko' | 'en'
  published_date?: string
  is_active?: boolean
}

// 활성화된 뉴스레터 목록 조회 (공개용)
export async function getActiveNewsletters(language?: 'ko' | 'en') {
  let query = supabase
    .from('newsletters')
    .select('*')
    .eq('is_active', true)
    .order('published_date', { ascending: false })

  if (language) {
    query = query.eq('language', language)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching newsletters:', error)
    return { newsletters: [], error }
  }

  return { newsletters: data as Newsletter[], error: null }
}

// 최신 뉴스레터 조회 (언어별)
export async function getLatestNewsletters(limit: number = 6) {
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('is_active', true)
    .order('published_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest newsletters:', error)
    return { newsletters: [], error }
  }

  return { newsletters: data as Newsletter[], error: null }
}

// 특정 뉴스레터 조회
export async function getNewsletterById(id: number) {
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 생성 (관리자용)
export async function createNewsletter(newsletterData: NewsletterCreateData) {
  const { data, error } = await supabase
    .from('newsletters')
    .insert([newsletterData])
    .select()
    .single()

  if (error) {
    console.error('Error creating newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 업데이트 (관리자용)
export async function updateNewsletter(id: number, newsletterData: NewsletterUpdateData) {
  const { data, error } = await supabase
    .from('newsletters')
    .update({ ...newsletterData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 삭제 (관리자용)
export async function deleteNewsletter(id: number) {
  const { error } = await supabase
    .from('newsletters')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting newsletter:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// 파일 크기 포맷팅
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return '알 수 없음'
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// 날짜 포맷팅
export function formatNewsletterDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
