"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Briefcase, FileText, Users, ShieldAlert, UserMinus, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const servicesData = [
  {
    id: "labor-consulting",
    icon: Briefcase,
    title: "노동법 자문",
    shortDescription: "기업 운영 전반의 노동법률 리스크 예방 및 대응",
    details: [
      "근로계약서, 취업규칙 등 제규정 검토 및 정비",
      "인사노무 관련 법률 자문 및 컨설팅",
      "노동 관련 법규 변경사항 안내 및 대응 전략 수립",
      "노사협의회 운영 자문",
    ],
  },
  {
    id: "payroll",
    icon: FileText,
    title: "급여 아웃소싱 및 4대보험",
    shortDescription: "정확하고 효율적인 급여 관리 및 4대보험 업무 대행",
    details: [
      "월별 급여계산 및 명세서 발급",
      "4대보험 취득/상실 신고 및 정산",
      "연말정산 업무 대행",
      "퇴직금 및 퇴직연금 관리 자문",
    ],
  },
  {
    id: "hr-consulting",
    icon: Users,
    title: "인사노무 컨설팅",
    shortDescription: "기업 맞춤형 인사제도 설계 및 운영 지원",
    details: [
      "채용, 평가, 보상 시스템 설계",
      "직무분석 및 조직설계 컨설팅",
      "성과관리 시스템 구축 및 운영 지원",
      "인사 관련 교육 프로그램 개발 및 운영",
    ],
  },
  {
    id: "industrial-accident",
    icon: ShieldAlert,
    title: "산업재해",
    shortDescription: "산업재해 발생 시 신속한 대응 및 보상 절차 지원",
    details: [
      "산업재해 신청 및 심사청구 대리",
      "업무상 질병 관련 자문 및 사건 처리",
      "산재 예방을 위한 컨설팅 및 교육",
      "사업주 책임 관련 법률 자문",
    ],
  },
  {
    id: "unfair-dismissal",
    icon: UserMinus,
    title: "부당해고 및 징계",
    shortDescription: "부당해고, 부당징계 등 노동위원회 사건 대리",
    details: [
      "부당해고 구제신청 사건 대리",
      "부당징계 관련 법률 자문 및 대응",
      "화해 및 조정 절차 지원",
      "해고 관련 법적 리스크 검토",
    ],
  },
  {
    id: "workplace-harassment",
    icon: MessageCircle,
    title: "직장 내 괴롭힘 및 성희롱",
    shortDescription: "직장 내 괴롭힘 예방 및 발생 시 조사, 처리 지원",
    details: [
      "직장 내 괴롭힘 예방 교육 및 시스템 구축",
      "사건 발생 시 조사 및 처리 절차 자문",
      "피해자 보호 및 가해자 징계 관련 컨설팅",
      "관련 법규 준수 및 분쟁 해결 지원",
    ],
  },
]

export default function ServicesClientPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="text-center mb-8 md:mb-12 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            주요 서비스
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            노무법인 [법인명]은 고객의 성공을 위한 맞춤형 전문 서비스를 제공합니다.
          </motion.p>
        </div>

        <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-8 md:mb-12 max-w-6xl mx-auto">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                    <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm sm:text-base leading-relaxed">{service.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.details.slice(0, 2).map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <a href={`#${service.id}`} className="text-primary hover:underline text-sm font-medium transition-colors">
                    자세히 보기 &darr;
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-semibold mb-6 md:mb-8 text-center px-4"
        >
          서비스 상세 안내
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <AccordionItem value={service.id} id={service.id} className="scroll-mt-20">
                  <AccordionTrigger className="text-base sm:text-lg font-medium hover:no-underline py-4 px-2 md:px-4">
                    <div className="flex items-center gap-3">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                      <span className="text-left">{service.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4 px-2 md:px-4">
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">{service.shortDescription}</p>
                    <ul className="space-y-3">
                      {service.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-3 mt-0.5 text-green-600 flex-shrink-0" />
                          <span className="text-foreground text-sm sm:text-base leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <strong>기대 효과:</strong> {service.title} 서비스를 통해 법적 리스크를 최소화하고, 안정적인
                      노사관계를 구축하며, 기업 경쟁력을 강화할 수 있습니다.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
