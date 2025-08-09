"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"
import { Newsletter, getLatestNewsletters } from "@/lib/newsletter"

// BoardPost 타입 정의 (실제 DB 스키마에 맞춤)
interface BoardPost {
  id: number
  title: string
  slug: string
  published_at: string
}

// NewsletterGridContent 인라인 컴포넌트
function NewsletterGridContentInline() {
  const [koreanNewsletters, setKoreanNewsletters] = useState<Newsletter[]>([])
  const [englishNewsletters, setEnglishNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNewsletters() {
      try {
        // 실제 DB에서 데이터 가져오기
        const { newsletters: allNewsletters } = await getLatestNewsletters(6)
        const korean = allNewsletters.filter(n => n.language === 'ko').slice(0, 3)
        const english = allNewsletters.filter(n => n.language === 'en').slice(0, 3)
        setKoreanNewsletters(korean)
        setEnglishNewsletters(english)
      } catch (error) {
        console.error('Failed to load newsletters:', error)
        // 에러 발생 시 임시 데이터 사용
        const mockNewsletters: Newsletter[] = [
          {
            id: 1,
            title: '노동법 주요 개정사항 2024년 1분기',
            description: null,
            cover_image_url: null,
            file_url: '/newsletters/2024-q1-ko.pdf',
            file_size: null,
            published_date: '2024-03-15',
            language: 'ko',
            is_active: true,
            created_at: '2024-03-15',
            updated_at: '2024-03-15'
          },
          {
            id: 2,
            title: '근로기준법 시행령 변경사항',
            description: null,
            cover_image_url: null,
            file_url: '/newsletters/2024-feb-ko.pdf',
            file_size: null,
            published_date: '2024-02-20',
            language: 'ko',
            is_active: true,
            created_at: '2024-02-20',
            updated_at: '2024-02-20'
          },
          {
            id: 3,
            title: 'Labor Law Updates Q1 2024',
            description: null,
            cover_image_url: null,
            file_url: '/newsletters/2024-q1-en.pdf',
            file_size: null,
            published_date: '2024-03-15',
            language: 'en',
            is_active: true,
            created_at: '2024-03-15',
            updated_at: '2024-03-15'
          }
        ]
        
        const korean = mockNewsletters.filter(n => n.language === 'ko').slice(0, 3)
        const english = mockNewsletters.filter(n => n.language === 'en').slice(0, 3)
        setKoreanNewsletters(korean)
        setEnglishNewsletters(english)
      } finally {
        setLoading(false)
      }
    }

    loadNewsletters()
  }, [])

  const NewsletterRow = ({ newsletters, title }: { newsletters: Newsletter[], title: string }) => (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h4>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : newsletters.length > 0 ? (
        <div className="space-y-3">
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="group py-2 border-b border-gray-100 hover:border-primary/30 transition-colors cursor-pointer"
                   onClick={() => window.open(newsletter.file_url, '_blank')}>
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                    {newsletter.title}
                  </h5>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-xs">아직 발행된 주간지가 없습니다.</p>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <NewsletterRow 
        newsletters={koreanNewsletters} 
        title="한국어판"
      />
      
      <NewsletterRow 
        newsletters={englishNewsletters} 
        title="영어판"
      />
    </div>
  )
}

// 통합된 공지사항 및 주간지 섹션
export default function IntegratedNewsSection() {
  const [featuredPosts, setFeaturedPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        // 실제 DB에서 데이터 가져오기 (board.ts 라이브러리 사용)
        const { getFeaturedPosts } = await import('@/lib/board')
        const { posts } = await getFeaturedPosts(3)
        setFeaturedPosts(posts)
      } catch (error) {
        console.error('Failed to load featured posts:', error)
        // 에러 발생 시 임시 데이터 사용
        const mockPosts: BoardPost[] = [
          {
            id: 1,
            title: '2024년 최저임금 인상 관련 안내',
            slug: 'minimum-wage-2024',
            published_at: '2024-03-15'
          },
          {
            id: 2,
            title: '근로기준법 개정안 시행 예정',
            slug: 'labor-standards-act-amendment',
            published_at: '2024-03-10'
          },
          {
            id: 3,
            title: '산업재해보상보험법 변경사항',
            slug: 'industrial-accident-compensation',
            published_at: '2024-03-05'
          }
        ]
        setFeaturedPosts(mockPosts)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  return (
    <section id="latest-news-and-newsletter" className="w-full py-6 sm:py-8 md:py-12 bg-white">
      <div className="container-fluid max-w-7xl px-4">
        
        {/* 1:1 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* 공지사항 영역 (1/2) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  공지사항
                </h3>
                <div className="flex-1 ml-8">
                  <Link href="/board" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    더보기 →
                  </Link>
                </div>
              </div>
              
              {/* 구분선 */}
              <div className="w-full h-px bg-gray-200 mb-6"></div>
        
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="animate-pulse flex items-center justify-between py-3">
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredPosts.length > 0 ? (
                <div className="space-y-4">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={`/board/${post.slug}`}>
                        <div className="group py-3 border-b border-gray-100 hover:border-primary/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                              {post.title}
                            </h4>
                            <div className="text-sm text-gray-500 whitespace-nowrap">
                              {new Date(post.published_at).toLocaleDateString('ko-KR', {
                                year: '2-digit',
                                month: '2-digit',
                                day: '2-digit'
                              })}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">등록된 공지사항이 없습니다.</p>
                </div>
              )}
            </motion.div>
          </div>
        
          {/* 주간지 영역 (1/2) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  선함 주간지
                </h3>
                <div className="flex-1 ml-8">
                  <Link href="/services" className="text-sm text-gray-500 hover:text-primary transition-colors">
                    더보기 →
                  </Link>
                </div>
              </div>
              
              {/* 구분선 */}
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              
              {/* 주간지 그리드 컨텐츠 - 인라인 구현 */}
              <NewsletterGridContentInline />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
