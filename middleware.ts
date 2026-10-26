import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MAINTENANCE_ON = process.env.MAINTENANCE_MODE === 'true'
const BYPASS_SECRET = process.env.MAINTENANCE_BYPASS_SECRET || ''

export function middleware(request: NextRequest) {
    if (!MAINTENANCE_ON) {
        return NextResponse.next()
    }

    const { pathname, searchParams } = request.nextUrl

    // Allow maintenance page itself
    if (pathname === '/maintenance' || pathname.startsWith('/maintenance/')) {
        return NextResponse.next()
    }

    // Optional bypass for owners (cookie or query)
    const bypassQuery = searchParams.get('bypass')
    const bypassCookie = request.cookies.get('md_maintenance_bypass')?.value
    if (
        BYPASS_SECRET &&
        (bypassQuery === BYPASS_SECRET || bypassCookie === BYPASS_SECRET)
    ) {
        const response = NextResponse.next()
        if (bypassQuery === BYPASS_SECRET) {
            response.cookies.set('md_maintenance_bypass', BYPASS_SECRET, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
            })
        }
        return response
    }

    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    url.search = ''
    return NextResponse.redirect(url)
}

export const config = {
    matcher: [
        /*
         * Match all paths except static assets and Next internals.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?)$).*)',
    ],
}
