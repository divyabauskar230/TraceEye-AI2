import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // ज्या पानांवर विना-लॉगिन जाता येईल (होम पेज, लॉगिन, रजिस्टर)
  const isPublicPath = path === '/auth/login' || path === '/auth/register' || path === '/';

  // युजरकडे कुकी किंवा टोकन आहे का तपासा
  const token = request.cookies.get('token')?.value || '';

  // जर युजर लॉग्ड इन नसेल आणि तो प्रायव्हेट पेजवर जात असेल, तर त्याला लॉगिन पेजवर पाठवा
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// कोणत्या पानांवर हे नियम लागू असतील
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/investigations/:path*',
    '/history/:path*',
    '/settings/:path*',
  ],
};