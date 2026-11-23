export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { extractTokenFromHeader, verifyToken } from '@/lib/auth'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

const escapeHtml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

async function notifyNewInquiry(data: { firstName: string; lastName?: string; email: string; phone?: string; message: string; source?: string }) {
    const to = process.env.CONTACT_NOTIFY_EMAIL
    if (!to || !process.env.SMTP_HOST) {
        console.warn('Contact inquiry saved, but no notification sent: CONTACT_NOTIFY_EMAIL or SMTP_HOST is not set')
        return
    }

    const name = [data.firstName, data.lastName].filter(Boolean).join(' ')
    const rows: [string, string][] = [
        ['Name', name],
        ['Email', data.email],
        ['Phone', data.phone || '—'],
        ['Page', data.source || '—'],
    ]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dubsonstenoservices.com'

    await sendEmail({
        to,
        subject: `New website inquiry from ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; color: #111827;">
                <h2 style="margin: 0 0 16px;">New contact inquiry</h2>
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 16px;">
                    ${rows.map(([label, value]) => `<tr><td style="padding: 6px 12px 6px 0; font-weight: bold; vertical-align: top;">${label}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`).join('')}
                </table>
                <p style="font-weight: bold; margin: 0 0 6px;">Message</p>
                <p style="white-space: pre-wrap; margin: 0 0 24px; padding: 12px; background: #f4f6fa; border-radius: 6px;">${escapeHtml(data.message)}</p>
                <a href="${appUrl}/admin/inquiries" style="display: inline-block; background: #0B0B0C; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Open admin inbox</a>
            </div>`,
        text: `New contact inquiry\n\nName: ${name}\nEmail: ${data.email}\nPhone: ${data.phone || '-'}\nPage: ${data.source || '-'}\n\n${data.message}\n\nAdmin inbox: ${appUrl}/admin/inquiries`,
    })
}

const inquirySchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(1),
    source: z.string().optional(),
})

// Public endpoint: anyone submitting the site's contact / request-coverage forms lands here.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const data = inquirySchema.parse(body)

        const inquiry = await prisma.contactInquiry.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName || null,
                email: data.email,
                phone: data.phone || null,
                message: data.message,
                source: data.source || null,
            },
        })

        // Email notification is best-effort: the inquiry is already saved, so a mail failure must not fail the form.
        try {
            await notifyNewInquiry(data)
        } catch (notifyError) {
            console.error('Contact inquiry notification error:', notifyError)
        }

        return NextResponse.json({ id: inquiry.id }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
        }
        console.error('Create contact inquiry error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// Admin-only endpoint: list submitted inquiries for the admin inbox.
export async function GET(request: NextRequest) {
    try {
        const token = extractTokenFromHeader(request.headers.get('Authorization'))
        const payload = token ? verifyToken(token) : null

        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const inquiries = await prisma.contactInquiry.findMany({
            where: status ? { status } : undefined,
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ inquiries })
    } catch (error) {
        console.error('Fetch contact inquiries error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
