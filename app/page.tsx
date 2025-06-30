"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Briefcase, FileText, Users, ArrowRight, Play, Calculator, AlertTriangle, ClipboardCheck, Scale, MessageSquare, Award, Shield, TrendingUp, ChevronLeft, ChevronRight, Building2, HeadphonesIcon, BookOpen, FlaskConical, Globe } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { getFeaturedPosts } from "@/lib/board"
import type { BoardPost } from "@/lib/supabase"

// HeroSection 컴포넌트 - 검색창 중심 디자인
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // 상담 카테고리 키워드 태그들
  const consultationTags = [
    { id: 'wrongful_dismissal', name: '부당인사조치', color: '#EF4444', icon: '⚠️' },
    { id: 'unpaid_wages', name: '퇴직금체불', color: '#F59E0B', icon: '💰' },
    { id: 'workplace_harassment', name: '직장내괴롭힘', color: '#8B5CF6', icon: '🛡️' },
    { id: 'industrial_accident', name: '산재상담', color: '#10B981', icon: '❤️' },
    { id: 'labor_contract', name: '근로계약서', color: '#3B82F6', icon: '📄' }
  ]

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // AI 채팅 페이지로 이동
      window.location.href = `/tools/ai-consultation/chat?query=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleTagClick = (tagId: string, tagName: string) => {
    setSelectedCategory(tagId)
    // 카테고리별 상담 폼으로 이동
    window.location.href = `/tools/ai-consultation?category=${tagId}&name=${encodeURIComponent(tagName)}`
  }

      return (
    <section className="relative min-h-[calc(100vh-4.5rem)] w-full bg-white mt-[4.5rem]">
      <div className="container-fluid max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          {/* 메인 헤딩 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary font-medium mb-4">
              <span>⚖️</span>
              선함노동사무소와 함께하는 스마트 노동 상담
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              노동 문제,<br className="sm:hidden" /> 
              <span className="text-primary">궁금한 것을 물어보세요</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              19년 경험의 전문 노무사와 AI가 함께 24시간 도와드립니다
            </p>
          </motion.div>

          {/* 검색창 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white rounded-2xl shadow-xl border-2 border-gray-100 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="해고당했는데 정당한가요? 퇴직금이 얼마인가요? 무엇이든 물어보세요..."
                    className="flex-1 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    className="mx-2 px-6 md:px-8 py-3 md:py-4 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">AI 상담 시작</span>
                    <span className="sm:hidden">시작</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* 키워드 태그들 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <p className="text-sm text-gray-600 mb-4">또는 자주 묻는 주제를 선택하세요</p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
              {consultationTags.map((tag) => (
                <motion.button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id, tag.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white border-2 border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{
                    borderColor: selectedCategory === tag.id ? tag.color : undefined,
                    backgroundColor: selectedCategory === tag.id ? `${tag.color}10` : undefined
                  }}
                >
                  <span className="text-base">{tag.icon}</span>
                  <span className="text-sm md:text-base">#{tag.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 신뢰도 지표 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">200+</div>
              <div className="text-sm text-gray-600">승소 사건</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">19년</div>
              <div className="text-sm text-gray-600">전문 경력</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">24시간</div>
              <div className="text-sm text-gray-600">AI 상담</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// 서비스 카테고리 섹션 추가
function ServiceCategoriesSection() {
  const categories = [
    {
      icon: Building2,
      title: "선함 노동상담실",
      subtitle: "LABOR OFFICE",
      description: "개인 근로자를 위한 전문 상담",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=144&parentCategoryNo=144",
      bgColor: "bg-blue-500",
      textColor: "text-white"
    },
    {
      icon: HeadphonesIcon,
      title: "선함 상담실",
      subtitle: "COUNSELING OFFICE",
      description: "24시간 온라인 상담 서비스",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=148&parentCategoryNo=148",
      bgColor: "bg-gray-400",
      textColor: "text-white"
    },
    {
      icon: BookOpen,
      title: "선함 자료실",
      subtitle: "REFERENCE LIBRARY",
      description: "노동법 관련 자료 모음",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=192&parentCategoryNo=192",
      bgColor: "bg-blue-500",
      textColor: "text-white"
    },
    {
      icon: FlaskConical,
      title: "선함 연구실",
      subtitle: "LABORATORY",
      description: "노동 문제 분석 및 연구",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=184&parentCategoryNo=184",
      bgColor: "bg-gray-400",
      textColor: "text-white"
    },
    {
      icon: Globe,
      title: "선함 미국법상식",
      subtitle: "UNITED STATES LAW",
      description: "미국 노동법 정보 제공",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=174&parentCategoryNo=174",
      bgColor: "bg-blue-500",
      textColor: "text-white"
    }
  ]

  return (
    <section className="w-full py-10 md:py-16 bg-white">
      <div className="container-fluid max-w-7xl px-4">
        <div className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <Link href={category.href}>
                <div className="flex flex-col items-center text-center cursor-pointer group">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${category.bgColor} ${category.textColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      {category.subtitle}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 회사 소개 통합 섹션 (기존 CompanyStrengthSection + 비디오 결합)
function CompanyIntroSection() {
  const strengths = [
    {
      icon: Award,
      title: "200건+ 압도적 승소율",
      description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과",
      highlight: "200건+"
    },
    {
      icon: TrendingUp,
      title: "2005년 설립, 19년 경험",
      description: "국내외 100여 업체의 신뢰받는 파트너",
      highlight: "19년"
    },
    {
      icon: Shield,
      title: "김&장 출신 전문성",
      description: "대표 정광일, 연세대 MBA, 제8회 공인노무사",
      highlight: "전문성"
    }
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        {/* 회사 강점 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-sm text-primary font-medium mb-3">
            <span>🏆</span>
            신뢰받는 이유  
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            <span className="text-primary">선함노동사무소</span>를 선택하는 이유
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            치밀한 논리와 철저한 준비로 근로자의 권익을 보호해온 19년의 경험
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <strength.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">{strength.highlight}</div>
                    <h3 className="font-semibold text-lg text-gray-900">{strength.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 회사 소개 영상 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            영상으로 만나는 선함노동사무소
          </h3>
          <p className="text-muted-foreground">
            2005년 설립 이후 근로자의 권익 보호에 새로운 지평을 열어가고 있습니다.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl group">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example"
              title="선함노동사무소 회사 소개"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <Play className="w-12 h-12 text-white/80" />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-3"
          >
            <Card className="inline-block bg-primary/5 border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 justify-center">
                  <Play className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    "법률지식을 넘어 문제를 해결할 수 있는 전략을 제공합니다"
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ToolsSection 컴포넌트 - 노무 업무 도구 그리드
function ToolsSection() {
  const laborTools = [
    {
      icon: AlertTriangle,
      title: "부당해고 진단",
      description: "내가 받은 해고가 정당한지 무료로 진단",
      href: "/tools/dismissal-checker",
      color: "text-red-600",
      bgColor: "bg-red-50",
      badge: "핫이슈"
    },
    {
      icon: Calculator,
      title: "퇴직금 계산기",
      description: "정확한 퇴직금과 각종 수당 계산",
      href: "/tools/severance-calculator",
      color: "text-green-600",
      bgColor: "bg-green-50",
      badge: "즉시"
    },
    {
      icon: ClipboardCheck,
      title: "근로계약서 검토",
      description: "내 계약서가 불리하지 않은지 체크",
      href: "/tools/contract-generator/create",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      badge: "무료"
    },
    {
      icon: Scale,
      title: "근로시간 체크",
      description: "초과근무와 휴게시간 법적 검토",
      href: "/tools/working-time-checker",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      badge: "법적"
    },
    {
      icon: MessageSquare,
      title: "AI 노무 상담",
      description: "24시간 언제든지 궁금한 것을 물어보세요",
      href: "/tools/ai-consultation",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: "24시간"
    }
  ]

  return (
    <section className="w-full py-6 md:py-10 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 md:mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-sm text-primary font-medium mb-3">
            <span>🛠️</span>
            스마트 노무 도구
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            근로자를 위한 <span className="text-primary">스마트 도구</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            복잡한 노동 문제를 간단하게 해결하세요. 24시간 언제든지 무료로 이용 가능합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
          {laborTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={tool.href}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <div className={`p-3 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <tool.icon className={`w-7 h-7 ${tool.color}`} />
                        </div>
                        <span className="absolute -top-1 -right-1 text-xs font-medium bg-primary text-white px-1.5 py-0.5 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors leading-tight">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-4 md:mt-6"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>💡</span>
            더 복잡한 문제라면 
            <Link href="/contact" className="text-primary hover:underline font-medium ml-1">
              전문가 비대면 상담
            </Link>
            을 받아보세요
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ServiceCard 컴포넌트
interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
  href: string
  index: number
}

function ServiceCard({ icon: Icon, title, description, href, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Icon className="w-10 h-10 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="mb-4 text-base">{description}</CardDescription>
        </CardContent>
        <div className="p-6 pt-0 mt-auto">
          <Link href={href}>
            <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
              자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const { posts } = await getFeaturedPosts(3)
        setFeaturedPosts(posts)
      } catch (error) {
        console.error('Failed to load featured posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  const services = [
    {
      icon: Briefcase,
      title: "노동법 자문",
      description: "기업 운영에 필요한 노동법률 전반에 대한 자문 서비스 제공",
      href: "/services#labor-consulting",
    },
    {
      icon: FileText,
      title: "급여 아웃소싱",
      description: "정확하고 효율적인 급여 관리 및 4대보험 업무 대행",
      href: "/services#payroll",
    },
    {
      icon: Users,
      title: "인사노무 컨설팅",
      description: "채용부터 퇴직까지 인사관리 시스템 구축 및 전문 컨설팅",
      href: "/services#hr-consulting",
    },
  ]

  return (
    <>
      {/* 상단 리다이렉트 바 - 메인페이지에만 표시 */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-slate-100 border-b border-slate-200 py-1">
        <div className="container-fluid max-w-7xl px-4 md:px-6">
          <div className="flex justify-center items-center gap-4 text-xs">
            <Link href="https://blog.naver.com/PostList.naver?blogId=fairhr" className="text-slate-600 hover:text-primary transition-colors">
              선함노동사무소 블로그
            </Link>
            <span className="text-slate-400">|</span>
            <Link href="https://h-rsystem.vercel.app/" className="text-slate-600 hover:text-primary transition-colors">
              FAIR인사노무컨설팅회
            </Link>
          </div>
        </div>
      </div>
      
      <HeroSection />
      <ServiceCategoriesSection />
      <CompanyIntroSection />
      <ToolsSection />

      <section id="services-summary" className="w-full py-8 md:py-12 bg-slate-50">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              핵심 서비스
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">
              근로자를 위한 전문 서비스
            </h2>
            <p className="max-w-[90%] sm:max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
              선함노동사무소는 개인 근로자를 위한 전문적인 상담과 법률 서비스를 제공하여, 
              노동 문제를 쉽고 정확하게 해결해 드립니다.
            </p>
          </motion.div>
          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="latest-news" className="w-full py-8 md:py-12 bg-slate-50">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">최신 소식 및 공지사항</h2>
            <p className="max-w-[90%] sm:max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
              노동 시장의 최신 동향과 선함노동사무소의 주요 소식을 가장 먼저 확인하세요.
            </p>
          </motion.div>
          
          {loading ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <Link href={`/board/${post.slug}`}>
                        <CardTitle className="text-sm sm:text-base lg:text-lg hover:text-primary transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="text-xs sm:text-sm">
                        {new Date(post.published_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pb-3">
                      {post.excerpt && (
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </CardContent>
                    <div className="p-4 sm:p-6 pt-0 mt-auto">
                      <Link href={`/board/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                          내용 보기
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">등록된 소식이 없습니다.</p>
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-6 md:mt-8 px-4"
          >
            <Link href="/board">
              <Button size="lg" className="w-full sm:w-auto">더 많은 소식 보기</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="contact-cta" className="w-full py-8 md:py-12 bg-primary/5">
        <div className="container-fluid grid items-center justify-center gap-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3 px-4"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl leading-tight">혼자 고민하지 마세요</h2>
            <p className="mx-auto max-w-[90%] sm:max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              선함노동사무소가 근로자의 권익을 위해 24시간 함께합니다.
              <br className="hidden sm:block" />
              비대면 상담 문의:{" "}
              <a href="tel:02-1234-5678" className="text-primary hover:underline font-medium">
                02-1234-5678
              </a>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full max-w-sm space-y-2 px-4"
          >
            <Link href="/contact">
              <Button size="lg" className="w-full">
                온라인 상담 바로가기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="location-summary" className="w-full py-8 md:py-12 border-t">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">오시는 길</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-5xl h-[300px] sm:h-[400px] md:h-[500px] px-4"
          >
            <KakaoMap
              latitude={37.5012743}
              longitude={127.039585}
              level={4}
              markerText="선함노동사무소 (역삼역 5번 출구 인근)"
              className="w-full h-full rounded-lg"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-3 md:mt-4 text-muted-foreground text-sm sm:text-base px-4"
          >
            서울특별시 강남구 테헤란로 123, 4층 (역삼역 5번 출구 도보 5분)
          </motion.p>
        </div>
      </section>
    </>
  )
}
