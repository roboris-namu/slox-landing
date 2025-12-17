import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 지원 언어 목록
 */
const locales = ['ko', 'en', 'ja', 'zh', 'de', 'fr', 'es', 'pt'];
const defaultLocale = 'ko';

/**
 * Accept-Language 헤더에서 최적 언어 감지
 */
function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;
  
  // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = 'q=1'] = lang.trim().split(';');
      const quality = parseFloat(q.split('=')[1] || '1');
      const langCode = code.split('-')[0].toLowerCase();
      return { code: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);
  
  for (const { code } of languages) {
    if (locales.includes(code)) {
      return code;
    }
  }
  
  // 지원하지 않는 언어는 영어로 fallback (한국어가 아닌 경우)
  // 예: 힌디어, 아랍어, 러시아어 등 → 영어
  const hasKorean = languages.some(({ code }) => code === 'ko');
  if (!hasKorean && languages.length > 0) {
    return 'en'; // 외국인은 영어로
  }
  
  return defaultLocale;
}

/**
 * 이미 언어 경로가 있는지 확인
 */
function hasLocalePrefix(pathname: string): boolean {
  return locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * 정적 파일 또는 API 경로인지 확인
 */
function isStaticOrApi(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') || // 파일 확장자가 있는 경우
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

/**
 * 한국어 전용 경로 (다국어 미지원)
 */
const koreanOnlyPaths = [
  '/admin',
  '/thesis',
  '/privacy',
  '/about',
  '/salary',
  '/severance',
  '/loan',
  '/savings',
  '/lotto',
  '/age',
  '/typing',
  '/slox-test',
];

function isKoreanOnlyPath(pathname: string): boolean {
  return koreanOnlyPaths.some(path => 
    pathname.startsWith(path)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 정적 파일이나 API는 무시
  if (isStaticOrApi(pathname)) {
    return NextResponse.next();
  }
  
  // 이미 언어 경로가 있으면 무시
  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }
  
  // 한국어 전용 경로는 무시
  if (isKoreanOnlyPath(pathname)) {
    return NextResponse.next();
  }
  
  // 쿠키에서 저장된 언어 설정 확인
  const savedLocale = request.cookies.get('SLOX_LOCALE')?.value;
  
  // 저장된 언어가 있고 한국어면 리다이렉트 안함 (기본 경로 유지)
  if (savedLocale === 'ko') {
    return NextResponse.next();
  }
  
  // 저장된 언어가 있고 다른 언어면 해당 언어로 리다이렉트
  if (savedLocale && locales.includes(savedLocale) && savedLocale !== 'ko') {
    const url = request.nextUrl.clone();
    url.pathname = `/${savedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }
  
  // 저장된 언어가 없으면 브라우저 언어 감지
  const acceptLanguage = request.headers.get('accept-language');
  const detectedLocale = getPreferredLocale(acceptLanguage);
  
  // 감지된 언어가 한국어면 기본 경로 유지
  if (detectedLocale === 'ko') {
    const response = NextResponse.next();
    response.cookies.set('SLOX_LOCALE', 'ko', { 
      maxAge: 60 * 60 * 24 * 365, // 1년
      path: '/',
    });
    return response;
  }
  
  // 다른 언어면 해당 언어 경로로 리다이렉트
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  
  const response = NextResponse.redirect(url);
  response.cookies.set('SLOX_LOCALE', detectedLocale, { 
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};

