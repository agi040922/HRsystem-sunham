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
