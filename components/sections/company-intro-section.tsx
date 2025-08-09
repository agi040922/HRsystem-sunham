"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// 회사 소개 섹션 - 3분할 인터랙티브 디자인 (FAIR 스타일 적용)
export default function CompanyIntroSection() {
  const companyCards = [
    {
      title: "200건+ 압도적 승소율",
      subtitle: "검증된 실력",
      description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과를 달성했습니다.",
      image: "/1.png",
      bgColor: "from-blue-900 to-blue-700"
    },
    {
      title: "2005년 설립, 19년차 경험",
      subtitle: "신뢰받는 파트너",
      description: "국내외 100여 업체의 신뢰받는 파트너로서 최적의 솔루션을 제공합니다.",
      image: "/2.png",
      bgColor: "from-slate-900 to-slate-700"
    },
    {
      title: "김&장 출신 전문성",
      subtitle: "최고 수준의 노하우",
      description: "기업 자문 및 컨설팅 경험 19년 이상의 전문성을 바탕으로 합니다.",
      image: "/3.png",
      bgColor: "from-primary to-primary/80"
    }
  ]

  return (
    <section className="w-full bg-slate-50 overflow-hidden">
      {/* 헤더 */}
      <div className="text-center py-6 sm:py-8 md:py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-primary">선함노동사무소</span>를 선택하는 이유
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            치밀한 논리와 철저한 준비로 근로자의 권익을 보호해온 19년의 경험
          </p>
        </motion.div>
      </div>

      {/* 3분할 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {companyCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative overflow-hidden cursor-pointer"
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* 그라디언트 오버레이 */}
              <div className={`absolute inset-0 bg-gradient-to-t ${card.bgColor} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
            </div>

            {/* 콘텐츠 */}
            <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
              {/* 기본 제목 (항상 보임) */}
              <div className="transform transition-all duration-500">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base opacity-90 mb-4">
                  {card.subtitle}
                </p>
              </div>

              {/* 호버 시 나타나는 상세 내용 */}
              <div className="transform transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm leading-relaxed opacity-90">
                    {card.description}
                  </p>
                </div>
              </div>
              
              {/* 호버 인디케이터 */}
              <div className="absolute top-8 right-8 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center
                           transform transition-all duration-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* 하단 액센트 라인 */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-500 group-hover:w-full"></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
