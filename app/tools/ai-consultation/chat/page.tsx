"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User,
  Loader2,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

// 메시지 타입 정의
interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

// 로딩 컴포넌트
function LoadingChat() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    AI 노동 상담
                  </h1>
                  <p className="text-sm text-gray-600">
                    정광일 노무사와 함께하는 24시간 상담
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">채팅을 준비하고 있습니다...</p>
        </div>
      </div>
    </div>
  )
}

// 메인 채팅 컴포넌트 (useSearchParams 사용)
function ChatComponent() {
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 초기 메시지 설정
  useEffect(() => {
    const query = searchParams.get('query')
    const category = searchParams.get('category')
    const categoryName = searchParams.get('name')

    // 환영 메시지 추가
    const welcomeMessage: Message = {
      id: 'welcome',
      type: 'ai',
      content: '안녕하세요! 선함노동사무소 AI 상담사입니다. 😊\n\n19년 경력의 정광일 노무사님의 전문 지식을 바탕으로 여러분의 노동 관련 궁금증을 도와드리겠습니다.\n\n무엇이든 편하게 질문해주세요!',
      timestamp: new Date()
    }

    setMessages([welcomeMessage])

    // URL에서 초기 쿼리가 있으면 자동으로 대화 시작
    if (query) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: query,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      handleAIResponse(query, category)
    } else if (category && categoryName) {
      const categoryMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: `${categoryName}에 대해서 상담받고 싶습니다.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, categoryMessage])
      handleAIResponse(`${categoryName}에 대해서 상담받고 싶습니다.`, category)
    }

    // 입력창에 포커스
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [searchParams])

  // 메시지 목록 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // AI 응답 처리
  const handleAIResponse = async (userMessage: string, category?: string | null) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          category: category || 'general',
          sessionId: sessionId,
          conversationType: 'chat'
        })
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          type: 'ai',
          content: data.response || '죄송합니다. 응답을 생성하는 중에 오류가 발생했습니다. 다시 시도해주세요.',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, aiMessage])

        // DB에 대화 내역 저장
        await fetch('/api/consultations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: sessionId,
            message: userMessage,
            response: data.response,
            category: category || 'general',
            conversationType: 'chat'
          })
        })
      } else {
        throw new Error(data.error || '응답 생성 실패')
      }
    } catch (error) {
      console.error('AI 응답 오류:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\n\n긴급한 상담이 필요하시면 02-1234-5678로 직접 연락해주세요.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = inputMessage.trim()
    setInputMessage("")

    await handleAIResponse(messageToSend)
  }

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 메시지 포맷팅 (줄바꿈 처리)
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    AI 노동 상담
                  </h1>
                  <p className="text-sm text-gray-600">
                    정광일 노무사와 함께하는 24시간 상담
                  </p>
                </div>
              </div>
            </div>
            
            {/* 상태 표시 */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>온라인</span>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* 아바타 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* 메시지 내용 */}
                  <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-white border border-gray-200 rounded-bl-md'
                    }`}>
                      <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                        {formatMessage(message.content)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 로딩 메시지 */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">답변을 생성하고 있습니다...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="무엇이든 편하게 질문해주세요..."
                disabled={isLoading}
                className="flex-1 border-gray-300 focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="lg"
                className="px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* 하단 안내 문구 */}
            <div className="text-xs text-gray-500 mt-2 text-center">
              선함노동사무소 AI는 정광일 노무사의 19년 경험을 바탕으로 답변을 제공합니다.
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// 메인 페이지 컴포넌트 - Suspense로 감싸기
export default function ChatPage() {
  return (
    <Suspense fallback={<LoadingChat />}>
      <ChatComponent />
    </Suspense>
  )
}