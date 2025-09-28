"use client"

// import Link from "next/link" // 외부 링크이므로 일반 a 태그 사용
// import { motion } from "framer-motion" // 현재 사용하지 않음
import { Building2, HeadphonesIcon, BookOpen, FlaskConical, Globe } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"

// 서비스 카테고리 섹션
export default function ServiceCategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([])
  
  const categories = [
    {
      icon: Building2,
      title: "선함 노동상담실",
      subtitle: "LABOR OFFICE",
      description: "개인 근로자를 위한 전문 상담",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=144&parentCategoryNo=144",
      bgColor: "#3b82f6",
      hoverColor: "#1d4ed8",
      textColor: "#ffffff",
      rotation: -8
    },
    {
      icon: HeadphonesIcon,
      title: "선함 상담실",
      subtitle: "COUNSELING OFFICE",
      description: "24시간 온라인 상담 서비스",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=148&parentCategoryNo=148",
      bgColor: "#10b981",
      hoverColor: "#059669",
      textColor: "#ffffff",
      rotation: 8
    },
    {
      icon: BookOpen,
      title: "선함 자료실",
      subtitle: "REFERENCE LIBRARY",
      description: "노동법 관련 자료 모음",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=192&parentCategoryNo=192",
      bgColor: "#f59e0b",
      hoverColor: "#d97706",
      textColor: "#ffffff",
      rotation: -5
    },
    {
      icon: FlaskConical,
      title: "선함 연구실",
      subtitle: "LABORATORY",
      description: "노동 문제 분석 및 연구",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=184&parentCategoryNo=184",
      bgColor: "#ef4444",
      hoverColor: "#dc2626",
      textColor: "#ffffff",
      rotation: 8
    },
    {
      icon: Globe,
      title: "선함 미국법상식",
      subtitle: "UNITED STATES LAW",
      description: "미국 노동법 정보 제공",
      href: "https://blog.naver.com/PostList.naver?blogId=fairhr&from=postList&categoryNo=174&parentCategoryNo=174",
      bgColor: "#8b5cf6",
      hoverColor: "#7c3aed",
      textColor: "#ffffff",
      rotation: -8
    }
  ]

  // 호버 애니메이션 효과
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    const bubble = bubblesRef.current[index]
    if (bubble) {
      gsap.to(bubble, {
        scale: 1.1,
        rotation: window.innerWidth >= 768 ? categories[index].rotation : 0,
        duration: 0.3,
        ease: "back.out(1.5)"
      })
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null)
    const bubble = bubblesRef.current[index]
    if (bubble) {
      gsap.to(bubble, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  // 초기 애니메이션
  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean)
    
    gsap.set(bubbles, { scale: 0, opacity: 0 })
    
    bubbles.forEach((bubble, index) => {
      gsap.to(bubble, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.1,
        ease: "back.out(1.5)"
      })
    })
  }, [])

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-100 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* 섹션 제목 */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            선함 서비스 카테고리
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            전문적인 노동법 서비스를 통해 여러분의 권익을 보호합니다
          </p>
        </div>

        {/* 버블 메뉴 스타일 카테고리 */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => {
                if (el) bubblesRef.current[index] = el
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <a 
                href={category.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center"
              >
                {/* 버블 아이콘 */}
                <div 
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 will-change-transform"
                  style={{
                    backgroundColor: hoveredIndex === index ? category.hoverColor : category.bgColor,
                    boxShadow: hoveredIndex === index 
                      ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 4px rgba(255, 255, 255, 0.5)' 
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <category.icon 
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-all duration-300" 
                    style={{ color: category.textColor }}
                  />
                  
                  {/* 호버 시 나타나는 펄스 효과 */}
                  {hoveredIndex === index && (
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: category.bgColor }}
                    />
                  )}
                </div>
                
                {/* 텍스트 정보 */}
                <div className="space-y-1 sm:space-y-2 max-w-[120px] sm:max-w-[140px]">
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {category.subtitle}
                  </p>
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* 하단 안내 텍스트 */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-500">
            각 카테고리를 클릭하여 더 자세한 정보를 확인하세요
          </p>
        </div>
      </div>
    </section>
  )
}
