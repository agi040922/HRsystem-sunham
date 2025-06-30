-- ============================================
-- 선함노동사무소 AI 상담 시스템 DB 스키마 (ENUM 오류 해결)
-- ============================================

-- AI 상담 세션 테이블 (단순화)
CREATE TABLE ai_consultations (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_name VARCHAR(100),
  user_email VARCHAR(255),
  user_phone VARCHAR(50),
  category VARCHAR(100), -- 키워드 카테고리
  initial_query TEXT, -- 사용자의 첫 질문
  consultation_type VARCHAR(20) DEFAULT 'search', -- 'search', 'keyword', 'form'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  satisfaction_score INTEGER, -- 1-5 점수
  admin_notes TEXT, -- 관리자 메모
  follow_up_required BOOLEAN DEFAULT false,
  message_count INTEGER DEFAULT 0, -- 메시지 개수
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI 대화 내역 테이블 (단순화)
CREATE TABLE ai_messages (
  id SERIAL PRIMARY KEY,
  consultation_id INTEGER REFERENCES ai_consultations(id) ON DELETE CASCADE,
  sender_type VARCHAR(20) NOT NULL, -- 'user', 'ai', 'system'
  content TEXT NOT NULL,
  metadata JSONB, -- 추가 메타데이터
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 상담 카테고리 관리 테이블
CREATE TABLE consultation_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  keywords TEXT[], -- 관련 키워드 배열
  form_template JSONB, -- 폼 템플릿 정보
  color VARCHAR(20) DEFAULT '#3B82F6',
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 상담 평가 및 피드백 테이블
CREATE TABLE consultation_feedback (
  id SERIAL PRIMARY KEY,
  consultation_id INTEGER REFERENCES ai_consultations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL, -- 1-5 점수
  feedback_text TEXT,
  improvement_suggestions TEXT,
  would_recommend BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 관리자용 상담 분석 테이블
CREATE TABLE consultation_analytics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  category VARCHAR(100),
  total_consultations INTEGER DEFAULT 0,
  completed_consultations INTEGER DEFAULT 0,
  average_duration_minutes INTEGER DEFAULT 0,
  average_satisfaction DECIMAL(3,2),
  popular_keywords TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, category)
);

-- ============================================
-- 초기 데이터 입력
-- ============================================

-- 기본 상담 카테고리 데이터
INSERT INTO consultation_categories (name, display_name, description, keywords, color, icon, sort_order) VALUES
('wrongful_dismissal', '부당인사조치', '해고, 징계, 인사이동 등 부당한 인사조치에 대한 상담', ARRAY['해고', '징계', '부당해고', '인사조치', '징계해고', '경고'], '#EF4444', 'AlertTriangle', 1),
('unpaid_wages', '퇴직금체불', '임금, 퇴직금, 상여금 등 미지급 문제에 대한 상담', ARRAY['임금체불', '퇴직금', '상여금', '연장근로수당', '주휴수당'], '#F59E0B', 'DollarSign', 2),
('workplace_harassment', '직장내괴롭힘', '직장 내 괴롭힘, 성희롱, 갑질 등에 대한 상담', ARRAY['직장내괴롭힘', '성희롱', '갑질', '따돌림', '욕설'], '#8B5CF6', 'Shield', 3),
('industrial_accident', '산재상담', '업무상 재해, 산재보험, 치료비 등에 대한 상담', ARRAY['산재', '업무상재해', '산재보험', '치료비', '요양급여'], '#10B981', 'Heart', 4),
('labor_contract', '근로계약서', '근로계약서 검토, 근로조건 변경 등에 대한 상담', ARRAY['근로계약서', '근로조건', '계약변경', '임금', '근무시간'], '#3B82F6', 'FileText', 5);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_ai_consultations_session_id ON ai_consultations(session_id);
CREATE INDEX idx_ai_consultations_category ON ai_consultations(category);
CREATE INDEX idx_ai_consultations_status ON ai_consultations(status);
CREATE INDEX idx_ai_consultations_created_at ON ai_consultations(created_at);
CREATE INDEX idx_ai_messages_consultation_id ON ai_messages(consultation_id);
CREATE INDEX idx_ai_messages_timestamp ON ai_messages(timestamp);
CREATE INDEX idx_consultation_categories_name ON consultation_categories(name);
CREATE INDEX idx_consultation_analytics_date ON consultation_analytics(date);

-- message_count 증가 함수 (옵션)
CREATE OR REPLACE FUNCTION increment_message_count(consultation_id INTEGER)
RETURNS INTEGER AS $$
BEGIN
    UPDATE ai_consultations 
    SET message_count = message_count + 1 
    WHERE id = consultation_id;
    
    RETURN (SELECT message_count FROM ai_consultations WHERE id = consultation_id);
END;
$$ LANGUAGE plpgsql; 