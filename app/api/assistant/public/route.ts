export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { askLLM, kbToText, loadKbFile } from '@/lib/ai-assistant'
import { guideForRole } from '@/lib/assistant-knowledge'

// Public (anonymous) endpoint for the "Marina Dubson Assistant" on the marketing site.
// Public knowledge only — no DB access, no actions.

const askSchema = z.object({
    question: z.string().min(1).max(500),
    page: z.string().max(100).optional(),
})

const FALLBACK =
    "Sorry, I couldn't answer that right now. Please use the <span class=\"ts-ref\">Contact</span> page and the team will help."

export async function POST(request: NextRequest) {
    try {
        const { question, page } = askSchema.parse(await request.json())
        const kb = loadKbFile('site-assistant-kb.js')

        const ai = await askLLM({
            question,
            page,
            roleLabel: 'an anonymous website visitor (not logged in)',
            knowledge: guideForRole('visitor') + '\n\nQUICK FAQ:\n' + kbToText(kb, 'visitor'),
            audience: 'public',
        })

        return NextResponse.json({ answer: ai || FALLBACK, declined: false, intent: ai ? 'ai' : null })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
        }
        console.error('Public assistant error:', error)
        return NextResponse.json({ answer: FALLBACK, declined: false })
    }
}
