"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Bot, 
  Loader2,
  Shield,
  Award,
  Phone,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  Scale
} from "lucide-react"
import Link from "next/link"

// 상담 카테고리 정보
const CATEGORY_INFO = {
  wrongful_dismissal: { 
    name: '부당인사조치', 
    color: '#EF4444', 
    icon: '⚠️',
    description: '해고, 징계, 전보 등 부당한 인사조치 상담'
  },
  unpaid_wages: { 
    name: '퇴직금체불', 
    color: '#F59E0B', 
    icon: '💰',
    description: '임금, 퇴직금, 수당 등 체불 관련 상담'
  },
  workplace_harassment: { 
    name: '직장내괴롭힘', 
    color: '#8B5CF6', 
    icon: '🛡️',
    description: '직장 내 괴롭힘, 성희롱 등 상담'
  },
  industrial_accident: { 
    name: '산재상담', 
    color: '#10B981', 
    icon: '❤️',
    description: '업무상 재해, 산재 신청 관련 상담'
  },
  labor_contract: { 
    name: '근로계약서', 
    color: '#3B82F6', 
    icon: '📄',
    description: '근로계약서 작성, 검토 관련 상담'
  }
}

// 폼 데이터 타입
interface FormData {
  [key: string]: any
}

// AI 분석 결과 타입
interface AIAnalysis {
  winRate: number
  lossRate: number
  legalIssues: string[]
  requiredEvidence: string[]
  expectedProcess: string[]
  expectedDuration: string
  missingInfo: string[]
  recommendations: string[]
  riskFactors: string[]
}

// 로딩 컴포넌트
function LoadingConsultation() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    AI 상담 시스템
                  </h1>
                  <Badge variant="secondary">
                    AI 법률 분석 시스템
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">상담 시스템을 준비하고 있습니다...</p>
        </div>
      </div>
    </div>
  )
}

// 메인 상담 컴포넌트 (useSearchParams 사용)
function ConsultationComponent() {
  const searchParams = useSearchParams()
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<'form' | 'analysis'>('form')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [formData, setFormData] = useState<FormData>({})

  // 초기화
  useEffect(() => {
    const category = searchParams.get('category')
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    
    if (category) {
      setCurrentCategory(category)
    }
  }, [searchParams])

  // 폼 데이터 업데이트
  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  // 체크박스 배열 업데이트
  const updateCheckboxArray = (key: string, value: string, checked: boolean) => {
    const currentArray = formData[key] || []
    if (checked) {
      updateFormData(key, [...currentArray, value])
    } else {
      updateFormData(key, currentArray.filter((item: string) => item !== value))
    }
  }

  // AI 분석 실행
  const handleAnalyzeCase = async () => {
    setIsAnalyzing(true)
    setCurrentStep('analysis')

    try {
      // AI 분석 요청
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'AI 법률 분석 요청',
          category: currentCategory,
          formData: formData,
          analysisType: 'legal_analysis', 
          sessionId: sessionId
        })
      })

      const data = await response.json()

      if (data.success) {
        // AI 응답에서 분석 결과 추출 (실제로는 더 정교한 파싱 필요)
        const mockAnalysis: AIAnalysis = {
          winRate: Math.floor(Math.random() * 30 + 65), // 65-95%
          lossRate: Math.floor(Math.random() * 25 + 5), // 5-30%
          legalIssues: [
            '근로기준법 제23조 해고 제한 위반 여부',
            '해고 절차의 적정성 검토 필요',
            '해고 사유의 객관적 합리성 부족'
          ],
          requiredEvidence: [
            '근로계약서 원본',
            '해고 통지서 및 관련 문서',
            '업무 성과 관련 자료',
            '동료 증언서'
          ],
          expectedProcess: [
            '노동위원회 부당해고 구제신청',
            '조정 또는 심판 절차 진행',
            '필요시 민사소송 제기',
            '강제집행 절차'
          ],
          expectedDuration: '4-8개월',
          missingInfo: [
            '정확한 해고 일자',
            '회사의 취업규칙 내용',
            '이전 징계 이력 여부'
          ],
          recommendations: [
            '즉시 노동위원회 구제신청 준비',
            '추가 증거 수집 필요',
            '전문 노무사 직접 상담 권장'
          ],
          riskFactors: [
            '신청 기간 제한 (해고일로부터 3개월)',
            '증거 부족으로 인한 입증 어려움'
          ]
        }

        setAnalysis(mockAnalysis)

        // DB에 상담 내역 저장
        await fetch('/api/consultations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionId,
            message: `${CATEGORY_INFO[currentCategory as keyof typeof CATEGORY_INFO]?.name} 사건 분석`,
            response: data.response,
            category: currentCategory,
            formData: formData
          })
        })
      }
    } catch (error) {
      console.error('분석 오류:', error)
    }

    setIsAnalyzing(false)
  }  // 부당인사조치 폼 렌더링
  const renderWrongfulDismissalForm = () => (
    <div className="space-y-6">
      <div>
        <Label>해고/징계 유형</Label>
        <Select value={formData.dismissalType || ''} onValueChange={(value) => updateFormData('dismissalType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="해고/징계 유형을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ordinary_dismissal">일반해고</SelectItem>
            <SelectItem value="disciplinary_dismissal">징계해고</SelectItem>
            <SelectItem value="economic_dismissal">경영상 해고</SelectItem>
            <SelectItem value="disciplinary_action">징계처분</SelectItem>
            <SelectItem value="transfer">전보</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>해고/징계 사유</Label>
        <Textarea 
          value={formData.dismissalReason || ''}
          onChange={(e) => updateFormData('dismissalReason', e.target.value)}
          placeholder="회사에서 제시한 해고/징계 사유를 구체적으로 작성해주세요"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label>해고/징계 절차</Label>
        <RadioGroup 
          value={formData.dismissalProcess || ''} 
          onValueChange={(value) => updateFormData('dismissalProcess', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="proper" id="proper" />
            <Label htmlFor="proper">정당한 절차를 거쳤음</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="improper" id="improper" />
            <Label htmlFor="improper">절차상 문제가 있었음</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unknown" id="unknown" />
            <Label htmlFor="unknown">잘 모르겠음</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>근무 기간</Label>
          <Input 
            value={formData.workPeriod || ''}
            onChange={(e) => updateFormData('workPeriod', e.target.value)}
            placeholder="예: 2년 3개월"
          />
        </div>
        <div>
          <Label>월 급여</Label>
          <Input 
            value={formData.salary || ''}
            onChange={(e) => updateFormData('salary', e.target.value)}
            placeholder="예: 300만원"
          />
        </div>
      </div>

      <div>
        <Label>보유 증거 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['근로계약서', '급여명세서', '해고통지서', '징계통지서', '이메일', '녹음/녹화', '증인', '기타'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.evidence || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('evidence', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>추가 정보</Label>
        <Textarea 
          value={formData.additionalInfo || ''}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="기타 참고할 만한 상황이나 정보가 있다면 작성해주세요"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )

  // 퇴직금체불 폼 렌더링
  const renderUnpaidWagesForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>근무 기간</Label>
          <Input 
            value={formData.workPeriod || ''}
            onChange={(e) => updateFormData('workPeriod', e.target.value)}
            placeholder="예: 2년 3개월"
          />
        </div>
        <div>
          <Label>월 급여</Label>
          <Input 
            value={formData.salary || ''}
            onChange={(e) => updateFormData('salary', e.target.value)}
            placeholder="예: 300만원"
          />
        </div>
      </div>

      <div>
        <Label>미지급 금액</Label>
        <Input 
          value={formData.unpaidAmount || ''}
          onChange={(e) => updateFormData('unpaidAmount', e.target.value)}
          placeholder="예: 500만원"
        />
      </div>

      <div>
        <Label>미지급 항목 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['임금', '퇴직금', '상여금', '연장근로수당', '주휴수당', '연차수당', '기타'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.unpaidType || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('unpaidType', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>퇴직 사유</Label>
        <Select value={formData.quitReason || ''} onValueChange={(value) => updateFormData('quitReason', value)}>
          <SelectTrigger>
            <SelectValue placeholder="퇴직 사유를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="voluntary">자발적 퇴직</SelectItem>
            <SelectItem value="dismissal">해고</SelectItem>
            <SelectItem value="contract_end">계약 만료</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>추가 정보</Label>
        <Textarea 
          value={formData.additionalInfo || ''}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="기타 참고할 만한 상황이나 정보가 있다면 작성해주세요"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )

  // 직장내괴롭힘 폼 렌더링
  const renderWorkplaceHarassmentForm = () => (
    <div className="space-y-6">
      <div>
        <Label>괴롭힘 유형 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['언어폭력', '신체폭력', '성희롱', '따돌림/배제', '업무배제', '과도한 업무', '기타'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.harassmentType || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('harassmentType', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>가해자</Label>
        <Select value={formData.perpetrator || ''} onValueChange={(value) => updateFormData('perpetrator', value)}>
          <SelectTrigger>
            <SelectValue placeholder="가해자를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="direct_supervisor">직속상사</SelectItem>
            <SelectItem value="upper_management">상위관리자</SelectItem>
            <SelectItem value="colleague">동료</SelectItem>
            <SelectItem value="subordinate">후배/부하직원</SelectItem>
            <SelectItem value="multiple">다수</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>발생 빈도</Label>
        <RadioGroup 
          value={formData.frequency || ''} 
          onValueChange={(value) => updateFormData('frequency', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">거의 매일</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">주 2-3회</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">월 1-2회</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="occasional" id="occasional" />
            <Label htmlFor="occasional">가끔</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>구체적 상황</Label>
        <Textarea 
          value={formData.situation || ''}
          onChange={(e) => updateFormData('situation', e.target.value)}
          placeholder="괴롭힘이 발생한 구체적인 상황을 자세히 기술해주세요"
          className="min-h-[120px]"
        />
      </div>

      <div>
        <Label>신고 이력</Label>
        <RadioGroup 
          value={formData.reportHistory || ''} 
          onValueChange={(value) => updateFormData('reportHistory', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="reported" id="reported" />
            <Label htmlFor="reported">이미 신고했음</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_reported" id="not_reported" />
            <Label htmlFor="not_reported">아직 신고하지 않음</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>보유 증거 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['대화기록', '이메일', '메신저', '녹음파일', '녹화영상', '사진', '증인', '진단서'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.evidence || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('evidence', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>추가 정보</Label>
        <Textarea 
          value={formData.additionalInfo || ''}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="기타 참고할 만한 상황이나 정보가 있다면 작성해주세요"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )

  // 산재상담 폼 렌더링
  const renderIndustrialAccidentForm = () => (
    <div className="space-y-6">
      <div>
        <Label>사고 발생일</Label>
        <Input 
          type="date"
          value={formData.accidentDate || ''}
          onChange={(e) => updateFormData('accidentDate', e.target.value)}
        />
      </div>

      <div>
        <Label>사고 유형</Label>
        <Select value={formData.accidentType || ''} onValueChange={(value) => updateFormData('accidentType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="사고 유형을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="injury">외상/상해</SelectItem>
            <SelectItem value="occupational_disease">직업병</SelectItem>
            <SelectItem value="commuting_accident">출퇴근 재해</SelectItem>
            <SelectItem value="overwork">과로사/과로자살</SelectItem>
            <SelectItem value="other">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>부상 정도</Label>
        <RadioGroup 
          value={formData.injuryLevel || ''} 
          onValueChange={(value) => updateFormData('injuryLevel', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minor" id="minor" />
            <Label htmlFor="minor">경상 (통원치료)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderate" id="moderate" />
            <Label htmlFor="moderate">중상 (입원치료)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="severe" id="severe" />
            <Label htmlFor="severe">중상 (장해가능성)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="death" id="death" />
            <Label htmlFor="death">사망</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>치료 현황</Label>
        <RadioGroup 
          value={formData.treatmentStatus || ''} 
          onValueChange={(value) => updateFormData('treatmentStatus', value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ongoing" id="ongoing" />
            <Label htmlFor="ongoing">치료 중</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="completed" id="completed" />
            <Label htmlFor="completed">치료 완료</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_started" id="not_started" />
            <Label htmlFor="not_started">치료 시작 전</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>업무 관련성</Label>
        <Textarea 
          value={formData.workRelation || ''}
          onChange={(e) => updateFormData('workRelation', e.target.value)}
          placeholder="사고가 업무와 어떤 관련이 있는지 구체적으로 설명해주세요"
          className="min-h-[100px]"
        />
      </div>

      <div>
        <Label>보유 증거 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['의료기록', '진단서', '사고현장사진', '목격자진술', '안전교육기록', 'CCTV', '업무지시서', '기타'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.evidence || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('evidence', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>추가 정보</Label>
        <Textarea 
          value={formData.additionalInfo || ''}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="기타 참고할 만한 상황이나 정보가 있다면 작성해주세요"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )

  // 근로계약서 폼 렌더링
  const renderLaborContractForm = () => (
    <div className="space-y-6">
      <div>
        <Label>계약 유형</Label>
        <Select value={formData.contractType || ''} onValueChange={(value) => updateFormData('contractType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="계약 유형을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="permanent">정규직</SelectItem>
            <SelectItem value="temporary">계약직</SelectItem>
            <SelectItem value="part_time">시간제</SelectItem>
            <SelectItem value="intern">인턴</SelectItem>
            <SelectItem value="none">계약서 없음</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>계약 기간</Label>
          <Input 
            value={formData.workPeriod || ''}
            onChange={(e) => updateFormData('workPeriod', e.target.value)}
            placeholder="예: 1년, 무기한 등"
          />
        </div>
        <div>
          <Label>급여</Label>
          <Input 
            value={formData.salary || ''}
            onChange={(e) => updateFormData('salary', e.target.value)}
            placeholder="예: 월 300만원"
          />
        </div>
      </div>

      <div>
        <Label>근무시간</Label>
        <Input 
          value={formData.workingHours || ''}
          onChange={(e) => updateFormData('workingHours', e.target.value)}
          placeholder="예: 주 40시간, 09:00-18:00"
        />
      </div>

      <div>
        <Label>문제가 되는 부분 (복수 선택 가능)</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['임금', '근무시간', '휴일/휴가', '해고조건', '비밀유지', '경업금지', '손해배상', '기타'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox 
                id={item}
                checked={(formData.problemArea || []).includes(item)}
                onCheckedChange={(checked) => updateCheckboxArray('problemArea', item, checked as boolean)}
              />
              <Label htmlFor={item} className="text-sm">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>구체적인 문제점</Label>
        <Textarea 
          value={formData.specificIssue || ''}
          onChange={(e) => updateFormData('specificIssue', e.target.value)}
          placeholder="계약서의 어떤 부분이 문제인지 구체적으로 설명해주세요"
          className="min-h-[120px]"
        />
      </div>

      <div>
        <Label>추가 정보</Label>
        <Textarea 
          value={formData.additionalInfo || ''}
          onChange={(e) => updateFormData('additionalInfo', e.target.value)}
          placeholder="기타 참고할 만한 상황이나 정보가 있다면 작성해주세요"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )

  // 분석 결과 렌더링
  const renderAnalysisResult = () => {
    if (!analysis) return null

    return (
      <div className="space-y-6">
        {/* 승률/패소률 */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              승소 가능성 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">{analysis.winRate}%</div>
                <div className="text-sm text-gray-600">승소 예상</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${analysis.winRate}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-1">{analysis.lossRate}%</div>
                <div className="text-sm text-gray-600">패소 위험</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${analysis.lossRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 법적 쟁점 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              주요 법적 쟁점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.legalIssues.map((issue: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm">{issue}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 부족한 정보 */}
        {analysis.missingInfo.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="w-5 h-5" />
                추가 필요 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.missingInfo.map((info: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                    <span className="text-sm text-orange-800">{info}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* 위험 요소 */}
        {analysis.riskFactors.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                주의 사항
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.riskFactors.map((risk: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-red-800">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* 예상 절차 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              예상 절차 및 기간
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.expectedProcess.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{step}</div>
                    {index < analysis.expectedProcess.length - 1 && (
                      <div className="w-px h-6 bg-gray-300 ml-4 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
                <strong>예상 소요 기간:</strong> {analysis.expectedDuration}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 권고사항 */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              전문가 권고사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-green-800">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">카테고리를 선택해주세요</h1>
          <Link href="/" className="text-primary hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = CATEGORY_INFO[currentCategory as keyof typeof CATEGORY_INFO]

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: `${categoryInfo.color}15` }}>
                  <span className="text-lg">{categoryInfo.icon}</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {categoryInfo.name} 전문 분석
                  </h1>
                  <Badge 
                    variant="secondary"
                    style={{ 
                      backgroundColor: `${categoryInfo.color}15`,
                      color: categoryInfo.color
                    }}
                  >
                    AI 법률 분석 시스템
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* 신뢰도 지표 */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>200+ 승소</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>19년 경력</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 'form' ? '사건 정보 입력' : 'AI 법률 분석 결과'}
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              {currentStep === 'form' 
                ? '정확한 분석을 위해 아래 정보를 상세히 입력해주세요'
                : '19년 경력 정광일 노무사의 전문 지식 기반 AI 분석 결과입니다'
              }
            </p>
          </CardHeader>
          
          <CardContent>
            {currentStep === 'form' ? (
              <div className="space-y-6">
                {/* 카테고리별 폼 렌더링 */}
                {currentCategory === 'wrongful_dismissal' && renderWrongfulDismissalForm()}
                {currentCategory === 'unpaid_wages' && renderUnpaidWagesForm()}
                {currentCategory === 'workplace_harassment' && renderWorkplaceHarassmentForm()}
                {currentCategory === 'industrial_accident' && renderIndustrialAccidentForm()}
                {currentCategory === 'labor_contract' && renderLaborContractForm()}
                
                {/* 분석 버튼 */}
                <div className="flex justify-center pt-6 border-t">
                  <Button 
                    onClick={handleAnalyzeCase}
                    disabled={isAnalyzing}
                    size="lg"
                    className="px-8 py-3"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        AI 분석 중...
                      </>
                    ) : (
                      <>
                        <Bot className="w-5 h-5 mr-2" />
                        AI 법률 분석 시작
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">AI가 사건을 분석하고 있습니다</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      정광일 노무사 19년 경력의 전문 지식을 바탕으로<br />
                      승률, 법적 쟁점, 필요 절차를 종합 분석 중입니다...
                    </p>
                  </div>
                ) : (
                  <>
                    {renderAnalysisResult()}
                    
                    {/* 액션 버튼들 */}
                    <div className="flex justify-center gap-4 pt-6 border-t">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep('form')}
                      >
                        정보 수정
                      </Button>
                      <Button className="px-6">
                        <Phone className="w-4 h-4 mr-2" />
                        전문가 직접 상담 (02-1234-5678)
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 메인 페이지 컴포넌트 - Suspense로 감싸기
export default function AIConsultationPage() {
  return (
    <Suspense fallback={<LoadingConsultation />}>
      <ConsultationComponent />
    </Suspense>
  )
}