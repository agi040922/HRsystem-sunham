"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Car, Train, Bus } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function LocationPage() {
  // 위치 정보
  const locationInfo = {
    name: "FAIR인사노무컨설팅",
    address: "서울 은평구 진관 3로 22 파크앤타워 B동 412호",
    postalCode: "03280",
    phone: "02-387-9869",
    email: "fairhr@nate.com",
    businessHours: {
      weekdays: "10:00 ~ 20:00",
      saturday: "10:00 ~ 17:00",
      sunday: "휴무"
    },
    latitude: 37.6290,
    longitude: 126.9205
  }

  const transportInfo = [
    {
      type: "지하철",
      icon: Train,
      routes: [
        "지하철 2호선 역삼역 5번 출구, 도보 5분",
        "지하철 9호선 봉은사역 1번 출구, 도보 10분",
        "지하철 3호선 압구정역 6번 출구, 도보 15분"
      ]
    },
    {
      type: "버스",
      icon: Bus,
      routes: [
        "강남파이낸스센터 정류장: 146, 341, 360, 740번",
        "역삼역 정류장: 142, 240, 401, 472번",
        "테헤란로 정류장: 500, 501, 502번"
      ]
    },
    {
      type: "자가용",
      icon: Car,
      routes: [
        "강남대로 → 테헤란로 → 목적지 도착",
        "올림픽대로 → 잠실대교 → 테헤란로",
        "한남대교 → 강남대로 → 테헤란로"
      ]
    }
  ]

  const nearbyLandmarks = [
    { name: "강남파이낸스센터", distance: "도보 2분" },
    { name: "코엑스몰", distance: "도보 8분" },
    { name: "봉은사", distance: "도보 12분" },
    { name: "선릉역", distance: "도보 7분" },
    { name: "삼성역", distance: "지하철 1정거장" },
    { name: "역삼역", distance: "도보 5분" }
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="오시는 길"
        subtitle="노무법인 [법인명] 위치 안내 및 교통편"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 지도 및 기본 정보 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 지도 */}
            <div>
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                    <KakaoMap
                      latitude={locationInfo.latitude}
                      longitude={locationInfo.longitude}
                      level={3}
                      markerText={locationInfo.name}
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{locationInfo.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      주소: {locationInfo.address}<br />
                      우편번호: {locationInfo.postalCode}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <Phone className="w-4 h-4 inline mr-2" />
                      전화: <a href={`tel:${locationInfo.phone}`} className="text-primary hover:underline">{locationInfo.phone}</a>
                    </p>

                    <p className="text-sm text-muted-foreground">
                      이메일: <a href={`mailto:${locationInfo.email}`} className="text-primary hover:underline">{locationInfo.email}</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="w-6 h-6 text-primary" />
                    운영시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">평일</span>
                      <span className="font-medium">{locationInfo.businessHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">토요일</span>
                      <span className="font-medium">{locationInfo.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">일요일/공휴일</span>
                      <span className="font-medium text-red-500">{locationInfo.businessHours.sunday}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-muted-foreground">
                      ※ 긴급 상담은 사전 예약 시 휴일에도 가능합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 