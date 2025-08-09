"use client"

import { motion } from "framer-motion"

// 기업 로고 슬라이더 섹션 - 실제 SUNHAM 프로젝트 로고 파일 사용
export default function CompanyLogosSection() {
  const companies = [
    { name: "Microsoft", logo: "/로고/마이크로소프트.png" },
    { name: "GE", logo: "/로고/GE.svg" },
    { name: "Citibank", logo: "/로고/씨티뱅크.jpg" },
    { name: "GSK", logo: "/로고/GSK.jpg" },
    { name: "YAMAHA", logo: "/로고/YAMAHA.jpeg" },
    { name: "DHL Express", logo: "/로고/DHLEXPRESS.jpg" },
    { name: "Johnson & Johnson", logo: "/로고/J&J.png" },
    { name: "GUCCI", logo: "/로고/GUCCI.png" },
    { name: "Novartis", logo: "/로고/NovartisNovartis.jpg" },
    { name: "Kellogg", logo: "/로고/Kellogg.svg" },
    { name: "NHK 서울지국", logo: "/로고/NHK 서울지국.png" }
  ]

  return (
    <section id="company-logos" className="w-full py-6 sm:py-8 md:py-12 bg-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        {/* 메인 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            <span className="text-primary">200여 외국계 기업</span>이 선택한 전문가
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
            2005년부터 19년간 글로벌 기업들의 신뢰받는 파트너
          </p>
        </motion.div>

        {/* 간단한 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">200+</div>
            <div className="text-sm text-gray-600">외국계 기업</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">19년</div>
            <div className="text-sm text-gray-600">전문 경험</div>
          </div>
        </motion.div>

        {/* 기업 로고 슬라이더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              함께한 <span className="text-primary">글로벌 기업</span>들
            </h3>
            <p className="text-base text-gray-600">신뢰받는 파트너로 함께 성장해온 기업들</p>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 -mx-4 md:-mx-8 lg:-mx-16">
            <div className="flex animate-scroll px-8">
              {/* 첫 번째 세트 */}
              <div className="flex space-x-16 min-w-max">
                {companies.map((company, index) => (
                  <div 
                    key={`first-${index}`}
                    className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              {/* 두 번째 세트 (무한 스크롤용) */}
              <div className="flex space-x-16 min-w-max ml-16">
                {companies.map((company, index) => (
                  <div 
                    key={`second-${index}`}
                    className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name} 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
