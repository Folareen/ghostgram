import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const privatePath = '/profile'
    const publicPaths = [
        '/login',
        '/signup'
    ]

    const pathname = request.nextUrl.pathname
    const token = request.cookies.get('token')

    if (token && publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    if (!token && privatePath == pathname) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}


export const config = {
    matcher: [
        '/login',
        '/signup',
        '/profile',
    ],
}