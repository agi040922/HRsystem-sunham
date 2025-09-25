"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

// 반응형 이미지 경로 설정 - 두 이미지만 사용
const heroImages = {
  mobile: '/sunham_mobile.png',              // 모바일용 이미지
  desktop: '/선한 이웃-메인 페이지----.png'    // 데스크톱용 이미지
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen">
      {/* 모바일 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url('${heroImages.mobile}')`
        }}
      />
      
      {/* 데스크톱 배경 이미지 (태블릿 포함) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url('${heroImages.desktop}')`
        }}
      />

      {/* 다크 오버레이 - 모바일에서 가독성 향상 */}
      <div className="absolute inset-0 bg-black/20 sm:bg-black/10 md:bg-black/5" />
      
      {/* 반응형 컨텐츠 컨테이너 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12">
        {/* 컨텐츠가 필요한 경우 여기에 추가 */}
      </div>
    </section>
  )
}
