"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Search, 
  MessageSquare, 
  Bot, 
  User, 
  Calendar, 
  RefreshCw,
  Eye,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  Download
} from "lucide-react"
import { motion } from "framer-motion"

// 타입 정의
interface ConsultationSummary {
  id: number
  session_id: string
  category?: string
  status: 'active' | 'completed' | 'abandoned'
  message_count: number
  created_at: string
  updated_at: string
}

interface DetailedConsultation {
  id: number
  session_id: string
  category?: string
  status: string
  message_count: number
  created_at: string
  updated_at: string
  ai_messages: Array<{
    id: number
    sender_type: 'user' | 'ai'
    content: string
    timestamp: string
  }>
}

// 카테고리 정보
const CATEGORY_INFO = {
  wrongful_dismissal: { name: '부당인사조치', color: '#EF4444', icon: '⚠️' },
  unpaid_wages: { name: '퇴직금체불', color: '#F59E0B', icon: '💰' },
  workplace_harassment: { name: '직장내괴롭힘', color: '#8B5CF6', icon: '🛡️' },
  industrial_accident: { name: '산재상담', color: '#10B981', icon: '❤️' },
  labor_contract: { name: '근로계약서', color: '#3B82F6', icon: '📄' }
}

// 상태별 스타일
const STATUS_STYLES = {
  active: { color: '#10B981', bg: '#DCFCE7', label: '진행중' },
  completed: { color: '#6B7280', bg: '#F3F4F6', label: '완료' },
  abandoned: { color: '#EF4444', bg: '#FEE2E2', label: '중단' }
}

export default function AIConsultationsAdminPage() {
  const [consultations, setConsultations] = useState<ConsultationSummary[]>([])
  const [selectedConsultation, setSelectedConsultation] = useState<DetailedConsultation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // 상담 목록 로드
  const loadConsultations = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })

      const response = await fetch(`/api/consultations?${params}`)
      const data = await response.json()

      if (data.success) {
        setConsultations(data.consultations || [])
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error('상담 목록 로드 오류:', error)
    }
    setIsLoading(false)
  }

  // 상담 상세 내역 로드
  const loadConsultationDetail = async (sessionId: string) => {
    setIsDetailLoading(true)
    try {
      const response = await fetch(`/api/consultations?sessionId=${sessionId}`)
      const data = await response.json()

      if (data.success) {
        setSelectedConsultation(data.consultation)
      }
    } catch (error) {
      console.error('상담 상세 내역 로드 오류:', error)
    }
    setIsDetailLoading(false)
  }

  useEffect(() => {
    loadConsultations()
  }, [currentPage])

  // 필터링된 상담 목록
  const filteredConsultations = consultations.filter(consultation =>
    consultation.session_id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 상담 관리</h1>
              <p className="text-gray-600">실시간 AI 상담 내역을 확인하고 관리하세요</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={loadConsultations} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                내보내기
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* 왼쪽: 상담 목록 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  상담 목록
                  <Badge variant="secondary">{filteredConsultations.length}</Badge>
                </CardTitle>
                
                {/* 검색 */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="세션 ID로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : filteredConsultations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      상담 내역이 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredConsultations.map((consultation) => (
                        <motion.div
                          key={consultation.id}
                          whileHover={{ backgroundColor: '#F9FAFB' }}
                          className={`p-4 border-b cursor-pointer transition-colors ${
                            selectedConsultation?.id === consultation.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                          onClick={() => loadConsultationDetail(consultation.session_id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              #{consultation.session_id.slice(-8)}
                            </div>
                            <Badge
                              style={{
                                backgroundColor: STATUS_STYLES[consultation.status as keyof typeof STATUS_STYLES].bg,
                                color: STATUS_STYLES[consultation.status as keyof typeof STATUS_STYLES].color
                              }}
                            >
                              {STATUS_STYLES[consultation.status as keyof typeof STATUS_STYLES].label}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            {consultation.category && CATEGORY_INFO[consultation.category as keyof typeof CATEGORY_INFO] && (
                              <Badge variant="outline" className="text-xs">
                                {CATEGORY_INFO[consultation.category as keyof typeof CATEGORY_INFO].icon}
                                {CATEGORY_INFO[consultation.category as keyof typeof CATEGORY_INFO].name}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              메시지 {consultation.message_count}개
                            </span>
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            시작: {formatDate(consultation.created_at)}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                
                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      이전
                    </Button>
                    
                    <span className="text-sm text-gray-600">
                      {currentPage} / {totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      다음
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽: 상담 상세 내역 */}
          <div className="lg:col-span-3">
            <Card className="h-[700px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  상담 상세 내역
                  {selectedConsultation && (
                    <Badge variant="outline">
                      #{selectedConsultation.session_id.slice(-8)}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {!selectedConsultation ? (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>상담을 선택하여 상세 내역을 확인하세요</p>
                    </div>
                  </div>
                ) : isDetailLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <>
                    {/* 상담 정보 */}
                    <div className="px-6 py-4 border-b bg-gray-50">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">세션 ID:</span>
                          <span className="ml-2 font-mono text-xs">{selectedConsultation.session_id}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">상태:</span>
                          <Badge 
                            className="ml-2"
                            style={{
                              backgroundColor: STATUS_STYLES[selectedConsultation.status as keyof typeof STATUS_STYLES].bg,
                              color: STATUS_STYLES[selectedConsultation.status as keyof typeof STATUS_STYLES].color
                            }}
                          >
                            {STATUS_STYLES[selectedConsultation.status as keyof typeof STATUS_STYLES].label}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-gray-600">카테고리:</span>
                          {selectedConsultation.category && CATEGORY_INFO[selectedConsultation.category as keyof typeof CATEGORY_INFO] ? (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {CATEGORY_INFO[selectedConsultation.category as keyof typeof CATEGORY_INFO].icon}
                              {CATEGORY_INFO[selectedConsultation.category as keyof typeof CATEGORY_INFO].name}
                            </Badge>
                          ) : (
                            <span className="ml-2 text-gray-400">없음</span>
                          )}
                        </div>
                        <div>
                          <span className="text-gray-600">메시지 수:</span>
                          <span className="ml-2">{selectedConsultation.message_count}개</span>
                        </div>
                      </div>
                    </div>

                    {/* 메시지 내역 */}
                    <ScrollArea className="flex-1 px-6 py-4">
                      <div className="space-y-4">
                        {selectedConsultation.ai_messages?.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              message.sender_type === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.sender_type !== 'user' && (
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-blue-600" />
                              </div>
                            )}
                            
                            <div className={`max-w-[80%] ${
                              message.sender_type === 'user' ? 'order-first' : ''
                            }`}>
                              <div className={`rounded-lg px-4 py-3 ${
                                message.sender_type === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                  {message.content}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 px-1">
                                {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </div>

                            {message.sender_type === 'user' && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-gray-600" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* 하단 액션 */}
                    <div className="px-6 py-4 border-t bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {formatDate(selectedConsultation.created_at)} 시작
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-1" />
                            전화 상담
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-1" />
                            이메일 전송
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 