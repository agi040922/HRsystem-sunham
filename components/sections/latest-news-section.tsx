"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { getFeaturedPosts } from "@/lib/board"
import type { BoardPost } from "@/lib/supabase"

// 최신 소식 및 공지사항 섹션
export default function LatestNewsSection() {
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

  return (
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
  )
}
