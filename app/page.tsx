"use client"

// 분리된 섹션 컴포넌트들 임포트
import HeroSection from "@/components/sections/hero-section"
import ServiceCategoriesSection from "@/components/sections/service-categories-section"
import CompanyIntroSection from "@/components/sections/company-intro-section"
// FAIR 스타일 새로운 섹션들 임포트
import CompanyLogosSection from "@/components/sections/company-logos-section"
import IntegratedNewsSection from "@/components/sections/integrated-news-section"

// 메인 홈페이지 컴포넌트 - 핵심 섹션들만 조합
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategoriesSection />
      <CompanyIntroSection />
      <CompanyLogosSection />
      <IntegratedNewsSection />
    </>
  )
}
