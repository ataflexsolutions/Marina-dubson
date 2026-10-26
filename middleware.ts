import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Maintenance is ON by default.
 * Set MAINTENANCE_MODE=false at Docker *build* time to bring the site back.
 * (Next.js middleware inlines this env during `next build`.)
 */
function isMaintenanceOn() {
    const value = process.env.MAINTENANCE_MODE
    if (value === undefined || value === '') return true
    return value === 'true' || value === '1'
}

const MAINTENANCE_ON = isMaintenanceOn()
const BYPASS_SECRET = process.env.MAINTENANCE_BYPASS_SECRET || ''

export function middleware(request: NextRequest) {
    if (!MAINTENANCE_ON) {
        return NextResponse.next()
    }

    const { pathname, searchParams } = request.nextUrl

    if (pathname === '/maintenance' || pathname.startsWith('/maintenance/')) {
        return NextResponse.next()
    }

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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?)$).*)',
    ],
}
