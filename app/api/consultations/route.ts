import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message, response, category, userInfo } = await request.json()

    // 1. AI 상담 세션 확인/생성
    let consultationId: number

    const { data: existingConsultation } = await supabase
      .from('ai_consultations')
      .select('id')
      .eq('session_id', sessionId)
      .single()

    if (existingConsultation) {
      consultationId = existingConsultation.id
      
      // 기존 세션 업데이트 (마지막 활동 시간)
      await supabase
        .from('ai_consultations')
        .update({ 
          updated_at: new Date().toISOString()
        })
        .eq('id', consultationId)
      
      // 메시지 카운트 증가
      await supabase.rpc('increment_message_count', { consultation_id: consultationId })
    } else {
      // 새 상담 세션 생성
      const { data: newConsultation, error: consultationError } = await supabase
        .from('ai_consultations')
        .insert({
          session_id: sessionId,
          category: category || null,
          initial_query: message, // 첫 질문 저장
          status: 'active',
          user_name: userInfo?.name || null,
          user_email: userInfo?.email || null,
          user_phone: userInfo?.phone || null,
          message_count: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single()

      if (consultationError) {
        console.error('상담 세션 생성 오류:', consultationError)
        return NextResponse.json(
          { error: '상담 세션 생성에 실패했습니다.' },
          { status: 500 }
        )
      }

      consultationId = newConsultation.id
    }

    // 2. 사용자 메시지 저장
    const { error: userMessageError } = await supabase
      .from('ai_messages')
      .insert({
        consultation_id: consultationId,
        sender_type: 'user',
        content: message,
        timestamp: new Date().toISOString()
      })

    if (userMessageError) {
      console.error('사용자 메시지 저장 오류:', userMessageError)
    }

    // 3. AI 응답 저장
    const { error: aiMessageError } = await supabase
      .from('ai_messages')
      .insert({
        consultation_id: consultationId,
        sender_type: 'ai',
        content: response,
        timestamp: new Date().toISOString()
      })

    if (aiMessageError) {
      console.error('AI 메시지 저장 오류:', aiMessageError)
    }

    return NextResponse.json({
      success: true,
      consultationId,
      message: '상담 내역이 저장되었습니다.'
    })

  } catch (error) {
    console.error('상담 데이터 저장 오류:', error)
    return NextResponse.json(
      { 
        error: '상담 데이터 저장 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    )
  }
}

// 상담 내역 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    if (sessionId) {
      // 특정 세션의 상담 내역 조회
      const { data: consultation, error: consultationError } = await supabase
        .from('ai_consultations')
        .select(`
          *,
          ai_messages (
            id,
            sender_type,
            content,
            timestamp
          )
        `)
        .eq('session_id', sessionId)
        .single()

      if (consultationError) {
        return NextResponse.json(
          { error: '상담 내역을 찾을 수 없습니다.' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        consultation
      })
    } else {
      // 전체 상담 목록 조회 (관리자용)
      const { data: consultations, error: consultationsError } = await supabase
        .from('ai_consultations')
        .select(`
          id,
          session_id,
          category,
          initial_query,
          status,
          user_name,
          user_email,
          user_phone,
          message_count,
          created_at,
          updated_at
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (consultationsError) {
        return NextResponse.json(
          { error: '상담 목록 조회에 실패했습니다.' },
          { status: 500 }
        )
      }

      // 전체 개수 조회
      const { count } = await supabase
        .from('ai_consultations')
        .select('*', { count: 'exact', head: true })

      return NextResponse.json({
        success: true,
        consultations,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit)
        }
      })
    }

  } catch (error) {
    console.error('상담 내역 조회 오류:', error)
    return NextResponse.json(
      { 
        error: '상담 내역 조회 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    )
  }
} 