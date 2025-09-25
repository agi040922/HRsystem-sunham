"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, HeadphonesIcon, BookOpen, FlaskConical, Globe } from "lucide-react"

// 서비스 카테고리 섹션
export default function ServiceCategoriesSection() {
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
    <section className="w-full py-6 sm:py-8 md:py-12 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* 모바일: 3개/2개 그리드 레이아웃 */}
        <div className="block sm:hidden">
          {/* 첫 번째 줄: 3개 */}
          <div className="flex justify-center items-center gap-4 mb-4">
            {categories.slice(0, 3).map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-1 max-w-[100px]"
              >
                <Link href={category.href}>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} ${category.textColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] text-gray-500 font-medium uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                      <h3 className="text-[10px] font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* 두 번째 줄: 2개 */}
          <div className="flex justify-center items-center gap-8">
            {categories.slice(3, 5).map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index + 3) * 0.1 }}
                className="flex-1 max-w-[100px]"
              >
                <Link href={category.href}>
                  <div className="flex flex-col items-center text-center cursor-pointer group">
                    <div className={`w-12 h-12 rounded-full ${category.bgColor} ${category.textColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[8px] text-gray-500 font-medium uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                      <h3 className="text-[10px] font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 태블릿 이상: 한줄 레이아웃 */}
        <div className="hidden sm:flex justify-center items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8 overflow-x-auto scrollbar-hide pb-2 min-w-0">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0 min-w-[70px] md:min-w-[80px]"
            >
              <Link href={category.href}>
                <div className="flex flex-col items-center text-center cursor-pointer group w-full">
                  <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full ${category.bgColor} ${category.textColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className="space-y-0.5 px-1">
                    <p className="text-[8px] md:text-[9px] text-gray-500 font-medium uppercase tracking-wider">
                      {category.subtitle}
                    </p>
                    <h3 className="text-[10px] md:text-xs font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
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
