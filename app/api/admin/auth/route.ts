import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin-password';
const AUTH_COOKIE = 'admin_auth';
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60,
};

export async function GET() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get(AUTH_COOKIE)?.value === 'true';
  return NextResponse.json({ authorized });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body?.password;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ authorized: true });
    response.cookies.set(AUTH_COOKIE, 'true', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Auth POST error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authorized: false });
  response.cookies.set(AUTH_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}
