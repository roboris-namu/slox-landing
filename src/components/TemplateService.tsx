"use client";

import { useState, useEffect, useRef } from "react";

// 카테고리 정의
const categories = [
  { id: "personal", name: "개인", emoji: "🧑", color: "from-blue-500 to-indigo-600" },
  { id: "family", name: "가족/친구", emoji: "👨‍👩‍👧", color: "from-pink-500 to-rose-600" },
  { id: "business", name: "비즈니스", emoji: "💼", color: "from-violet-500 to-purple-600" },
  { id: "event", name: "이벤트", emoji: "🎉", color: "from-amber-500 to-orange-600" },
];

// 템플릿 타입 정의
interface Template {
  code: string;
  name: string;
  desc: string;
  preview: string; // 미리보기 이미지 경로 또는 이모지
  demoUrl: string;
  available: boolean;
}

interface SubCategory {
  id: string;
  name: string;
  emoji: string;
  templates: Template[];
}

// 전체 템플릿 데이터
const templateData: Record<string, SubCategory[]> = {
  personal: [
    {
      id: "minimal",
      name: "미니멀 프로필",
      emoji: "🎯",
      templates: [
        { code: "P01", name: "화이트 미니멀", desc: "깔끔한 화이트 톤", preview: "🤍", demoUrl: "/template/P01", available: true },
        { code: "P02", name: "다크 엘레강스", desc: "세련된 다크 테마", preview: "🖤", demoUrl: "/template/P02", available: true },
        { code: "P03", name: "모던 그라데이션", desc: "트렌디한 컬러감", preview: "💜", demoUrl: "/template/P03", available: true },
        { code: "P04", name: "소프트 파스텔", desc: "부드러운 파스텔톤", preview: "🩷", demoUrl: "/template/P04", available: true },
        { code: "P05", name: "네온 사이버", desc: "미래지향적 네온", preview: "💚", demoUrl: "/template/P05", available: true },
        { code: "P06", name: "클래식 세리프", desc: "우아한 클래식 스타일", preview: "📜", demoUrl: "/template/P06", available: true },
        { code: "P07", name: "모노크롬", desc: "흑백 모던 감성", preview: "🔲", demoUrl: "/template/P07", available: true },
        { code: "P08", name: "선셋 웜", desc: "따뜻한 노을빛", preview: "🧡", demoUrl: "/template/P08", available: true },
        { code: "P09", name: "오션 블루", desc: "시원한 바다색", preview: "💙", demoUrl: "/template/P09", available: true },
      ],
    },
    {
      id: "portfolio",
      name: "포트폴리오",
      emoji: "🖼️",
      templates: [
        { code: "P10", name: "갤러리 화이트", desc: "작품 중심 밝은 레이아웃", preview: "🖼️", demoUrl: "/template/P10", available: true },
        { code: "P11", name: "갤러리 다크", desc: "작품 중심 어두운 레이아웃", preview: "🎨", demoUrl: "/template/P11", available: true },
        { code: "P12", name: "그리드 모던", desc: "정돈된 그리드 뷰", preview: "📐", demoUrl: "/template/P12", available: true },
        { code: "P13", name: "마소니 레이아웃", desc: "핀터레스트 스타일", preview: "🧱", demoUrl: "/template/P13", available: true },
        { code: "P14", name: "풀스크린 슬라이드", desc: "전체화면 슬라이더", preview: "🖥️", demoUrl: "/template/P14", available: true },
        { code: "P15", name: "스토리텔링", desc: "스크롤 애니메이션", preview: "📖", demoUrl: "/template/P15", available: true },
        { code: "P16", name: "케이스 스터디", desc: "프로젝트별 상세 소개", preview: "📋", demoUrl: "/template/P16", available: true },
        { code: "P17", name: "크리에이티브", desc: "창의적 비대칭 구성", preview: "✨", demoUrl: "/template/P17", available: true },
        { code: "P18", name: "미니멀 갤러리", desc: "여백 중심 디자인", preview: "⬜", demoUrl: "/template/P18", available: true },
      ],
    },
    {
      id: "resume",
      name: "이력서",
      emoji: "📄",
      templates: [
        { code: "P19", name: "클래식 이력서", desc: "전통적인 구성", preview: "📋", demoUrl: "/template/P19", available: true },
        { code: "P20", name: "크리에이티브 CV", desc: "창의적인 디자인", preview: "✨", demoUrl: "/template/P20", available: true },
        { code: "P21", name: "심플 원페이지", desc: "한 페이지 완결", preview: "📃", demoUrl: "/template/P21", available: true },
        { code: "P22", name: "모던 타임라인", desc: "경력 중심 구성", preview: "📅", demoUrl: "/template/P22", available: true },
        { code: "P23", name: "인포그래픽", desc: "시각적 데이터 표현", preview: "📊", demoUrl: "/template/P23", available: true },
        { code: "P24", name: "미니멀 화이트", desc: "깔끔한 화이트톤", preview: "⬜", demoUrl: "/template/P24", available: true },
        { code: "P25", name: "다크 프로페셔널", desc: "세련된 다크 테마", preview: "⬛", demoUrl: "/template/P25", available: true },
        { code: "P26", name: "컬러풀 모던", desc: "포인트 컬러 활용", preview: "🎨", demoUrl: "/template/P26", available: true },
        { code: "P27", name: "카드 스타일", desc: "섹션별 카드 구성", preview: "🃏", demoUrl: "/template/P27", available: true },
      ],
    },
    {
      id: "linktree",
      name: "링크트리형",
      emoji: "🔗",
      templates: [
        { code: "P28", name: "심플 링크", desc: "깔끔한 링크 모음", preview: "🔗", demoUrl: "/template/P28", available: true },
        { code: "P29", name: "아이콘 카드", desc: "아이콘 중심 구성", preview: "🃏", demoUrl: "/template/P29", available: true },
        { code: "P30", name: "프로필 링크", desc: "프로필+링크 조합", preview: "👤", demoUrl: "/template/P30", available: true },
        { code: "P31", name: "그라데이션", desc: "컬러풀 그라데이션", preview: "🌈", demoUrl: "/template/P31", available: true },
        { code: "P32", name: "네온 다크", desc: "네온 포인트 다크", preview: "💡", demoUrl: "/template/P32", available: true },
        { code: "P33", name: "미니멀 모노", desc: "흑백 미니멀", preview: "⚫", demoUrl: "/template/P33", available: true },
        { code: "P34", name: "파스텔 소프트", desc: "부드러운 파스텔", preview: "🩷", demoUrl: "/template/P34", available: true },
        { code: "P35", name: "글래스모피즘", desc: "투명 유리 효과", preview: "🪟", demoUrl: "/template/P35", available: true },
        { code: "P36", name: "레트로 팝", desc: "복고풍 팝 스타일", preview: "📺", demoUrl: "/template/P36", available: true },
      ],
    },
    {
      id: "creator",
      name: "크리에이터",
      emoji: "🎬",
      templates: [
        { code: "P37", name: "유튜버", desc: "유튜브 크리에이터", preview: "▶️", demoUrl: "/template/P37", available: true },
        { code: "P38", name: "스트리머", desc: "트위치/치지직", preview: "🎮", demoUrl: "/template/P38", available: true },
        { code: "P39", name: "인플루언서", desc: "SNS 인플루언서", preview: "⭐", demoUrl: "/template/P39", available: true },
        { code: "P40", name: "팟캐스터", desc: "팟캐스트 진행자", preview: "🎙️", demoUrl: "/template/P40", available: true },
        { code: "P41", name: "뷰티 크리에이터", desc: "뷰티/메이크업", preview: "💄", demoUrl: "/template/P41", available: true },
        { code: "P42", name: "푸드 크리에이터", desc: "먹방/요리", preview: "🍳", demoUrl: "/template/P42", available: true },
        { code: "P43", name: "여행 크리에이터", desc: "여행/브이로그", preview: "✈️", demoUrl: "/template/P43", available: true },
        { code: "P44", name: "음악 크리에이터", desc: "싱어/작곡가", preview: "🎵", demoUrl: "/template/P44", available: true },
        { code: "P45", name: "아티스트", desc: "그림/일러스트", preview: "🎨", demoUrl: "/template/P45", available: true },
      ],
    },
  ],
  family: [
    {
      id: "family-album",
      name: "패밀리 앨범",
      emoji: "👨‍👩‍👧‍👦",
      templates: [
        { code: "F01", name: "따뜻한 가족", desc: "포근한 분위기", preview: "🏠", demoUrl: "/template/F01", available: true },
        { code: "F02", name: "모던 패밀리", desc: "세련된 가족 앨범", preview: "📸", demoUrl: "/template/F02", available: true },
        { code: "F03", name: "타임라인", desc: "시간순 기록", preview: "📅", demoUrl: "/template/F03", available: true },
        { code: "F04", name: "포토 갤러리", desc: "사진 중심 앨범", preview: "🖼️", demoUrl: "/template/F04", available: true },
        { code: "F05", name: "미니멀 패밀리", desc: "깔끔한 디자인", preview: "⬜", demoUrl: "/template/F05", available: true },
        { code: "F06", name: "빈티지 앨범", desc: "클래식한 감성", preview: "📔", demoUrl: "/template/F06", available: true },
        { code: "F07", name: "컬러풀 패밀리", desc: "밝고 화사한 톤", preview: "🌈", demoUrl: "/template/F07", available: true },
        { code: "F08", name: "스토리북", desc: "동화책 스타일", preview: "📖", demoUrl: "/template/F08", available: true },
        { code: "F09", name: "심플 화이트", desc: "깨끗한 화이트톤", preview: "🤍", demoUrl: "/template/F09", available: true },
      ],
    },
    {
      id: "pet",
      name: "반려동물",
      emoji: "🐕",
      templates: [
        { code: "F10", name: "댕댕이 일기", desc: "강아지 전용", preview: "🐶", demoUrl: "/template/F10", available: true },
        { code: "F11", name: "냥이 앨범", desc: "고양이 전용", preview: "🐱", demoUrl: "/template/F11", available: true },
        { code: "F12", name: "펫 다이어리", desc: "모든 반려동물", preview: "🐾", demoUrl: "/template/F12", available: true },
        { code: "F13", name: "펫 포토북", desc: "사진 중심 앨범", preview: "📸", demoUrl: "/template/F13", available: true },
        { code: "F14", name: "성장일기", desc: "반려동물 성장기록", preview: "📏", demoUrl: "/template/F14", available: true },
        { code: "F15", name: "펫 프로필", desc: "반려동물 소개", preview: "🎀", demoUrl: "/template/F15", available: true },
        { code: "F16", name: "귀염뽀짝", desc: "귀여운 테마", preview: "💕", demoUrl: "/template/F16", available: true },
        { code: "F17", name: "자연 테마", desc: "자연 배경", preview: "🌿", demoUrl: "/template/F17", available: true },
        { code: "F18", name: "플레이풀", desc: "발랄한 분위기", preview: "🎾", demoUrl: "/template/F18", available: true },
      ],
    },
    {
      id: "kids",
      name: "아이 성장일기",
      emoji: "👶",
      templates: [
        { code: "F19", name: "베이비 그로스", desc: "성장 기록", preview: "👶", demoUrl: "/template/F19", available: true },
        { code: "F20", name: "키즈 타임라인", desc: "연령별 기록", preview: "📏", demoUrl: "/template/F20", available: true },
        { code: "F21", name: "포토 다이어리", desc: "사진 중심", preview: "📷", demoUrl: "/template/F21", available: true },
        { code: "F22", name: "첫돌 앨범", desc: "돌잔치용", preview: "🎂", demoUrl: "/template/F22", available: true },
        { code: "F23", name: "스쿨 메모리", desc: "학교생활 기록", preview: "🎒", demoUrl: "/template/F23", available: true },
        { code: "F24", name: "드림 키즈", desc: "꿈꾸는 아이", preview: "⭐", demoUrl: "/template/F24", available: true },
        { code: "F25", name: "파스텔 베이비", desc: "파스텔톤", preview: "🍼", demoUrl: "/template/F25", available: true },
        { code: "F26", name: "플레이타임", desc: "놀이 기록", preview: "🧸", demoUrl: "/template/F26", available: true },
        { code: "F27", name: "마일스톤", desc: "성장 이정표", preview: "🏆", demoUrl: "/template/F27", available: true },
      ],
    },
    {
      id: "friends",
      name: "동창회/동호회",
      emoji: "🎓",
      templates: [
        { code: "F28", name: "동창회 모임", desc: "학교 동창 페이지", preview: "🎓", demoUrl: "/template/F28", available: true },
        { code: "F29", name: "동호회 소개", desc: "취미 모임용", preview: "⚽", demoUrl: "/template/F29", available: true },
        { code: "F30", name: "여행 기록", desc: "여행 추억 페이지", preview: "✈️", demoUrl: "/template/F30", available: true },
        { code: "F31", name: "운동 동호회", desc: "스포츠 모임", preview: "🏃", demoUrl: "/template/F31", available: true },
        { code: "F32", name: "독서 모임", desc: "북클럽용", preview: "📚", demoUrl: "/template/F32", available: true },
        { code: "F33", name: "음악 동호회", desc: "밴드/합창단", preview: "🎵", demoUrl: "/template/F33", available: true },
        { code: "F34", name: "사진 동호회", desc: "출사 모임", preview: "📷", demoUrl: "/template/F34", available: true },
        { code: "F35", name: "등산 모임", desc: "산악회용", preview: "⛰️", demoUrl: "/template/F35", available: true },
        { code: "F36", name: "맛집 탐방", desc: "미식 모임", preview: "🍽️", demoUrl: "/template/F36", available: true },
      ],
    },
  ],
  business: [
    {
      id: "company",
      name: "회사 소개",
      emoji: "🏢",
      templates: [
        { code: "B01", name: "코퍼레이트", desc: "정통 기업 스타일", preview: "🏢", demoUrl: "/template/B01", available: true },
        { code: "B02", name: "스타트업", desc: "활기찬 스타트업", preview: "🚀", demoUrl: "/template/B02", available: true },
        { code: "B03", name: "모던 비즈니스", desc: "세련된 기업 이미지", preview: "💼", demoUrl: "/template/B03", available: true },
        { code: "B04", name: "테크 기업", desc: "IT/기술 회사", preview: "💻", demoUrl: "/template/B04", available: true },
        { code: "B05", name: "컨설팅 펌", desc: "전문 컨설팅", preview: "📊", demoUrl: "/template/B05", available: true },
        { code: "B06", name: "제조업체", desc: "공장/생산 기업", preview: "🏭", demoUrl: "/template/B06", available: true },
        { code: "B07", name: "글로벌 기업", desc: "다국적 기업", preview: "🌐", demoUrl: "/template/B07", available: true },
        { code: "B08", name: "중소기업", desc: "믿음직한 중견기업", preview: "🤝", demoUrl: "/template/B08", available: true },
        { code: "B09", name: "사회적 기업", desc: "가치 중심 기업", preview: "💚", demoUrl: "/template/B09", available: true },
      ],
    },
    {
      id: "freelancer",
      name: "1인 사업자",
      emoji: "👤",
      templates: [
        { code: "B10", name: "프리랜서 프로", desc: "전문가 이미지", preview: "💪", demoUrl: "/template/B10", available: true },
        { code: "B11", name: "크리에이터", desc: "창작자용", preview: "🎨", demoUrl: "/template/B11", available: true },
        { code: "B12", name: "컨설턴트", desc: "전문 서비스", preview: "📊", demoUrl: "/template/B12", available: true },
        { code: "B13", name: "포토그래퍼", desc: "사진 작가", preview: "📷", demoUrl: "/template/B13", available: true },
        { code: "B14", name: "강사/튜터", desc: "교육 전문가", preview: "📚", demoUrl: "/template/B14", available: true },
        { code: "B15", name: "디자이너", desc: "디자인 전문가", preview: "🎨", demoUrl: "/template/B15", available: true },
        { code: "B16", name: "개발자", desc: "프리랜서 개발자", preview: "💻", demoUrl: "/template/B16", available: true },
        { code: "B17", name: "마케터", desc: "마케팅 전문가", preview: "📈", demoUrl: "/template/B17", available: true },
        { code: "B18", name: "코치", desc: "라이프/비즈니스 코치", preview: "🎯", demoUrl: "/template/B18", available: true },
      ],
    },
    {
      id: "shop",
      name: "카페/식당",
      emoji: "☕",
      templates: [
        { code: "B19", name: "카페 무드", desc: "아늑한 카페 분위기", preview: "☕", demoUrl: "/template/B19", available: true },
        { code: "B20", name: "레스토랑", desc: "메뉴 중심 구성", preview: "🍽️", demoUrl: "/template/B20", available: true },
        { code: "B21", name: "베이커리", desc: "빵집/디저트 샵", preview: "🥐", demoUrl: "/template/B21", available: true },
        { code: "B22", name: "브런치 카페", desc: "세련된 브런치", preview: "🥗", demoUrl: "/template/B22", available: true },
        { code: "B23", name: "일식당", desc: "일본 음식점", preview: "🍣", demoUrl: "/template/B23", available: true },
        { code: "B24", name: "한식당", desc: "한국 전통 음식", preview: "🍲", demoUrl: "/template/B24", available: true },
        { code: "B25", name: "바/펍", desc: "칵테일바/펍", preview: "🍺", demoUrl: "/template/B25", available: true },
        { code: "B26", name: "피자집", desc: "이탈리안 피자", preview: "🍕", demoUrl: "/template/B26", available: true },
        { code: "B27", name: "디저트 카페", desc: "케이크/디저트", preview: "🍰", demoUrl: "/template/B27", available: true },
      ],
    },
    {
      id: "beauty",
      name: "헤어샵/네일",
      emoji: "💇",
      templates: [
        { code: "B28", name: "헤어 살롱", desc: "미용실용", preview: "💇", demoUrl: "/template/B28", available: true },
        { code: "B29", name: "네일 아트", desc: "네일샵용", preview: "💅", demoUrl: "/template/B29", available: true },
        { code: "B30", name: "뷰티 샵", desc: "종합 뷰티", preview: "💄", demoUrl: "/template/B30", available: true },
        { code: "B31", name: "바버샵", desc: "남성 전문", preview: "✂️", demoUrl: "/template/B31", available: true },
        { code: "B32", name: "속눈썹/눈썹", desc: "아이뷰티", preview: "👁️", demoUrl: "/template/B32", available: true },
        { code: "B33", name: "왁싱샵", desc: "왁싱 전문", preview: "✨", demoUrl: "/template/B33", available: true },
        { code: "B34", name: "피부관리", desc: "에스테틱", preview: "🧴", demoUrl: "/template/B34", available: true },
        { code: "B35", name: "메이크업", desc: "메이크업 전문", preview: "💋", demoUrl: "/template/B35", available: true },
        { code: "B36", name: "스파/마사지", desc: "힐링 공간", preview: "🧖", demoUrl: "/template/B36", available: true },
      ],
    },
    {
      id: "namecard",
      name: "온라인 명함",
      emoji: "💳",
      templates: [
        { code: "B37", name: "심플 명함", desc: "깔끔한 명함", preview: "📇", demoUrl: "/template/B37", available: true },
        { code: "B38", name: "QR 명함", desc: "QR코드 포함", preview: "📱", demoUrl: "/template/B38", available: true },
        { code: "B39", name: "프리미엄 명함", desc: "고급스러운 디자인", preview: "✨", demoUrl: "/template/B39", available: true },
        { code: "B40", name: "크리에이티브", desc: "개성있는 디자인", preview: "🎨", demoUrl: "/template/B40", available: true },
        { code: "B41", name: "미니멀", desc: "최소한의 정보", preview: "⚪", demoUrl: "/template/B41", available: true },
        { code: "B42", name: "다크 모드", desc: "세련된 다크", preview: "🖤", demoUrl: "/template/B42", available: true },
        { code: "B43", name: "그라데이션", desc: "화려한 색상", preview: "🌈", demoUrl: "/template/B43", available: true },
        { code: "B44", name: "사진 명함", desc: "프로필 사진 강조", preview: "📷", demoUrl: "/template/B44", available: true },
        { code: "B45", name: "SNS 명함", desc: "소셜 링크 중심", preview: "📲", demoUrl: "/template/B45", available: true },
      ],
    },
  ],
  event: [
    {
      id: "wedding",
      name: "웨딩 초대장",
      emoji: "💍",
      templates: [
        { code: "E01", name: "로맨틱 웨딩", desc: "낭만적인 분위기", preview: "💒", demoUrl: "/template/E01", available: true },
        { code: "E02", name: "모던 웨딩", desc: "세련된 청첩장", preview: "💍", demoUrl: "/template/E02", available: true },
        { code: "E03", name: "플라워 웨딩", desc: "꽃 테마 디자인", preview: "💐", demoUrl: "/template/E03", available: true },
        { code: "E04", name: "클래식 웨딩", desc: "전통적인 우아함", preview: "🕊️", demoUrl: "/template/E04", available: true },
        { code: "E05", name: "미니멀 웨딩", desc: "심플한 디자인", preview: "🤍", demoUrl: "/template/E05", available: true },
        { code: "E06", name: "가든 웨딩", desc: "야외 결혼식", preview: "🌿", demoUrl: "/template/E06", available: true },
        { code: "E07", name: "럭셔리 웨딩", desc: "고급스러운 스타일", preview: "✨", demoUrl: "/template/E07", available: true },
        { code: "E08", name: "빈티지 웨딩", desc: "클래식 감성", preview: "📜", demoUrl: "/template/E08", available: true },
        { code: "E09", name: "일러스트 웨딩", desc: "손그림 스타일", preview: "🎨", demoUrl: "/template/E09", available: true },
      ],
    },
    {
      id: "birthday",
      name: "돌잔치/생일",
      emoji: "🎂",
      templates: [
        { code: "E10", name: "첫 돌잔치", desc: "아기 돌잔치용", preview: "👶", demoUrl: "/template/E10", available: true },
        { code: "E11", name: "생일파티", desc: "생일 초대장", preview: "🎈", demoUrl: "/template/E11", available: true },
        { code: "E12", name: "키즈 파티", desc: "어린이 파티", preview: "🎪", demoUrl: "/template/E12", available: true },
        { code: "E13", name: "백일잔치", desc: "백일 기념", preview: "🍼", demoUrl: "/template/E13", available: true },
        { code: "E14", name: "서프라이즈", desc: "깜짝 파티", preview: "🎁", demoUrl: "/template/E14", available: true },
        { code: "E15", name: "프린세스", desc: "공주 테마", preview: "👑", demoUrl: "/template/E15", available: true },
        { code: "E16", name: "히어로", desc: "히어로 테마", preview: "🦸", demoUrl: "/template/E16", available: true },
        { code: "E17", name: "동물 테마", desc: "귀여운 동물", preview: "🐻", demoUrl: "/template/E17", available: true },
        { code: "E18", name: "우주 테마", desc: "우주 탐험", preview: "🚀", demoUrl: "/template/E18", available: true },
      ],
    },
    {
      id: "party",
      name: "송년회/신년회",
      emoji: "🥳",
      templates: [
        { code: "E19", name: "송년회", desc: "연말 모임용", preview: "🎆", demoUrl: "/template/E19", available: true },
        { code: "E20", name: "신년회", desc: "새해 모임용", preview: "🎊", demoUrl: "/template/E20", available: true },
        { code: "E21", name: "회식 모임", desc: "팀/회사 모임", preview: "🍻", demoUrl: "/template/E21", available: true },
        { code: "E22", name: "홈파티", desc: "집에서 파티", preview: "🏠", demoUrl: "/template/E22", available: true },
        { code: "E23", name: "졸업 파티", desc: "졸업 축하", preview: "🎓", demoUrl: "/template/E23", available: true },
        { code: "E24", name: "브라이덜샤워", desc: "결혼 전 파티", preview: "👰", demoUrl: "/template/E24", available: true },
        { code: "E25", name: "베이비샤워", desc: "출산 축하", preview: "🍼", demoUrl: "/template/E25", available: true },
        { code: "E26", name: "할로윈", desc: "할로윈 파티", preview: "🎃", demoUrl: "/template/E26", available: true },
        { code: "E27", name: "크리스마스", desc: "크리스마스 파티", preview: "🎄", demoUrl: "/template/E27", available: true },
      ],
    },
    {
      id: "exhibition",
      name: "전시/공연",
      emoji: "🎭",
      templates: [
        { code: "E28", name: "전시회", desc: "전시 안내 페이지", preview: "🖼️", demoUrl: "/template/E28", available: true },
        { code: "E29", name: "공연 안내", desc: "공연/콘서트용", preview: "🎵", demoUrl: "/template/E29", available: true },
        { code: "E30", name: "페스티벌", desc: "축제 홍보용", preview: "🎪", demoUrl: "/template/E30", available: true },
        { code: "E31", name: "갤러리 오픈", desc: "갤러리 개관", preview: "🏛️", demoUrl: "/template/E31", available: true },
        { code: "E32", name: "뮤지컬", desc: "뮤지컬 홍보", preview: "🎭", demoUrl: "/template/E32", available: true },
        { code: "E33", name: "클래식", desc: "클래식 공연", preview: "🎻", demoUrl: "/template/E33", available: true },
        { code: "E34", name: "팝업스토어", desc: "팝업 오픈", preview: "🏪", demoUrl: "/template/E34", available: true },
        { code: "E35", name: "워크숍", desc: "워크숍/세미나", preview: "📝", demoUrl: "/template/E35", available: true },
        { code: "E36", name: "런칭 이벤트", desc: "신제품 런칭", preview: "🚀", demoUrl: "/template/E36", available: true },
      ],
    },
  ],
};

export default function TemplateService() {
  const [activeCategory, setActiveCategory] = useState("personal");
  const [activeSubCategory, setActiveSubCategory] = useState("minimal");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory, activeSubCategory]); // 탭 변경 시 다시 관찰

  // 카테고리 변경 시 첫 번째 서브카테고리로 초기화
  useEffect(() => {
    const subCategories = templateData[activeCategory];
    if (subCategories && subCategories.length > 0) {
      setActiveSubCategory(subCategories[0].id);
    }
  }, [activeCategory]);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const subCategories = templateData[activeCategory] || [];
  const currentSubCategory = subCategories.find(s => s.id === activeSubCategory);
  const currentTemplates = currentSubCategory?.templates || [];

  return (
    <section id="services" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6">
            <span className="text-lg">☕</span>
            <span className="text-sm text-yellow-400 font-medium">커피 두 잔 값으로 나만의 홈페이지!</span>
          </div>
          
          <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" style={{ animationDelay: "0.1s" }}>
            전 템플릿{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              9,900원
            </span>
          </h2>
          <p className="animate-on-scroll text-lg text-white/60 max-w-xl mx-auto" style={{ animationDelay: "0.2s" }}>
            마음에 드는 템플릿 코드를 선택하세요 ✨
          </p>
        </div>

        {/* 1단계: 카테고리 탭 */}
        <div className="animate-on-scroll flex justify-center mb-8" style={{ animationDelay: "0.3s" }}>
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/70 border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {activeCategory === cat.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} rounded-xl opacity-90`} />
                )}
                <span className="relative z-10">{cat.emoji}</span>
                <span className="relative z-10 hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2단계: 서브카테고리 선택 */}
        <div className="animate-on-scroll flex justify-center gap-2 flex-wrap mb-8" style={{ animationDelay: "0.35s" }}>
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubCategory(sub.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSubCategory === sub.id
                  ? "bg-white text-slate-900 shadow-lg"
                  : "bg-slate-800/50 text-white/60 hover:text-white hover:bg-slate-700/50 border border-white/10"
              }`}
            >
              <span>{sub.emoji}</span>
              <span>{sub.name}</span>
            </button>
          ))}
        </div>

        {/* 3단계: 템플릿 카드 (3개씩) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {currentTemplates.map((template, index) => (
            <a
              key={template.code}
              href={template.available ? template.demoUrl : undefined}
              onClick={(e) => !template.available && e.preventDefault()}
              className={`animate-on-scroll group relative block rounded-2xl overflow-hidden transition-all duration-300 ${
                template.available 
                  ? "hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 cursor-pointer" 
                  : "opacity-60 cursor-not-allowed"
              }`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* 카드 배경 */}
              <div className={`relative bg-slate-800/70 border border-white/10 ${template.available ? "group-hover:border-white/20" : ""} rounded-2xl overflow-hidden`}>
                {/* 미리보기 영역 - iframe 실시간 프리뷰 */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  {template.available ? (
                    <>
                      {/* iframe 미리보기 (iOS Safari 최적화 적용) */}
                      <div 
                        className="absolute inset-0 origin-top-left scale-[0.25] w-[400%] h-[400%] pointer-events-none select-none"
                        style={{ 
                          touchAction: 'none',
                          WebkitOverflowScrolling: 'auto',
                          transform: 'scale(0.25) translateZ(0)', // GPU 가속
                          transformOrigin: 'top left',
                        }}
                      >
                        <iframe 
                          src={template.demoUrl}
                          className="w-full h-full border-0"
                          loading="lazy"
                          title={`${template.name} 미리보기`}
                          scrolling="no"
                          style={{
                            pointerEvents: 'none',
                            touchAction: 'none',
                          }}
                        />
                      </div>
                      {/* fallback: iframe 로딩 전 또는 광고차단시 표시 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-600/30 to-slate-700/30 -z-10">
                        <span className="text-4xl opacity-50">{template.preview}</span>
                      </div>
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white text-slate-900 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          미리보기 →
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-40">{template.preview}</span>
                      </div>
                      {/* 준비중 뱃지 */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 text-white/60 rounded-full text-xs">
                        준비중
                      </div>
                    </>
                  )}
                </div>

                {/* 카드 정보 */}
                <div className="p-5">
                  {/* 코드 뱃지 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      template.available 
                        ? `bg-gradient-to-r ${currentCategory?.color} text-white`
                        : "bg-slate-700 text-white/50"
                    }`}>
                      {template.code}
                    </span>
                    <span className={`text-lg font-bold ${template.available ? "text-yellow-400" : "text-white/30"}`}>
                      9,900<span className="text-sm text-white/50">원</span>
                    </span>
                  </div>

                  {/* 제목 & 설명 */}
                  <h4 className="font-bold text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-white/50">{template.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* 포함 사항 */}
        <div className="animate-on-scroll" style={{ animationDelay: "0.7s" }}>
          <div className="rounded-2xl bg-slate-800/50 border border-white/10 p-8">
            <h4 className="text-lg font-bold text-white mb-6 text-center">
              🎁 9,900원에 모두 포함
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: "📱", text: "모바일 최적화" },
                { icon: "🌐", text: "Vercel 무료 호스팅" },
                { icon: "🔒", text: "SSL 보안 인증서" },
                { icon: "✏️", text: "내용 수정 1회 무료" },
                { icon: "📅", text: "2~3일 완성" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/30">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="animate-on-scroll mt-12 text-center" style={{ animationDelay: "0.8s" }}>
          <p className="text-white/60 mb-4">
            원하는 템플릿 코드를 선택하셨나요?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-2xl hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-lg">📧</span>
            <span>지금 바로 신청하기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
