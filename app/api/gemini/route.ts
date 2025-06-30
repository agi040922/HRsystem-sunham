import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// 제미나이 AI 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// 선함노동사무소 프롬프트 설정
const SUNHAM_SYSTEM_PROMPT = `
당신은 선함노동사무소의 AI 상담 어시스턴트입니다. 
정광일 노무사(19년 경력, 김&장 출신, 200건+ 승소 경험)의 전문 지식을 바탕으로 상담을 제공합니다.

선함노동사무소는 개인 근로자를 위한 전문 노동 상담을 제공하며, 다음과 같은 분야에 특화되어 있습니다:
- 부당인사조치 (해고, 징계 등)
- 퇴직금 및 임금체불
- 직장내 괴롭힘
- 산업재해 상담
- 근로계약서 검토

상담 시 주의사항:
1. 정확하고 전문적인 법률 정보를 제공합니다
2. 개별 사안의 특수성을 고려하여 맞춤형 조언을 제공합니다
3. 필요시 전문 노무사와의 직접 상담을 권유합니다
4. 법적 용어는 쉽게 풀어서 설명합니다
5. 상담자의 권익 보호를 최우선으로 합니다

항상 친근하고 이해하기 쉽게 답변하되, 법적 정확성을 유지해야 합니다.
`

export async function POST(request: NextRequest) {
  try {
    const { message, category, sessionId, formData, analysisType } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: '제미나이 API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    // 사용 가능한 모델 목록 (우선순위 순)
    const models = ['gemini-2.5-flash', 'gemini-2.5-pro']
    let model
    let modelUsed = ''

    // 사용 가능한 모델 찾기
    for (const modelName of models) {
      try {
        model = genAI.getGenerativeModel({ model: modelName })
        modelUsed = modelName
        break
      } catch (error) {
        console.log(`모델 ${modelName} 초기화 실패, 다음 모델 시도 중...`)
        continue
      }
    }

    if (!model) {
      throw new Error('사용 가능한 Gemini 모델을 찾을 수 없습니다.')
    }

    // 카테고리별 전문 프롬프트 추가
    let categoryPrompt = ''
    if (category) {
      const categoryPrompts = {
        wrongful_dismissal: '부당인사조치와 해고 관련 전문 상담을 제공합니다.',
        unpaid_wages: '퇴직금 및 임금체불 관련 법적 권리와 해결 방안을 안내합니다.',
        workplace_harassment: '직장내 괴롭힘 대응 방법과 법적 보호 조치를 설명합니다.',
        industrial_accident: '산업재해 인정 기준과 보상 절차를 상세히 안내합니다.',
        labor_contract: '근로계약서 검토 및 불공정 조항 분석을 제공합니다.'
      }
      categoryPrompt = categoryPrompts[category as keyof typeof categoryPrompts] || ''
    }

    // 전체 프롬프트 구성
    let fullPrompt = ''
    
    if (analysisType === 'legal_analysis' && formData) {
      // 법률 분석 전용 프롬프트
      fullPrompt = `${SUNHAM_SYSTEM_PROMPT}

**전문 법률 분석 요청**
카테고리: ${category}
${categoryPrompt}

**입력된 사건 정보:**
${JSON.stringify(formData, null, 2)}

**분석 지시사항:**
1. 위 사건 정보를 바탕으로 승소 가능성을 65-95% 범위에서 정확히 예측
2. 주요 법적 쟁점 3-5개를 구체적으로 분석
3. 필요한 증거 목록을 명시
4. 예상 절차와 소요 기간을 단계별로 제시
5. 부족한 정보나 위험 요소가 있다면 명시
6. 구체적인 권고사항 제시

전문가 수준의 분석 결과를 제공해주세요.`
    } else {
      // 일반 상담 프롬프트
      fullPrompt = `${SUNHAM_SYSTEM_PROMPT}

${categoryPrompt}

사용자 질문: ${message}

위 내용을 바탕으로 전문적이고 친근한 상담을 제공해주세요.`
    }

    // 제미나이 API 호출
    console.log(`사용 중인 모델: ${modelUsed}`)
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      response: text,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      modelUsed: modelUsed
    })

  } catch (error) {
    console.error('제미나이 API 오류:', error)
    return NextResponse.json(
      { 
        error: 'AI 상담 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    )
  }
} 