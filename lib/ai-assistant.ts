// OpenRouter-backed answer generator for the two chat widgets.
// Knowledge comes from the existing KB files (public/technical-support/*-kb.js) plus EXTRA_FACTS below,
// so the content team still edits one place. The bot ONLY explains — it never performs actions.
import fs from 'fs'
import path from 'path'
import vm from 'vm'

type KbIntent = { id: string; roles: string[]; kw: string[]; a: string }
export type Kb = { KB: KbIntent[]; OOS: string[]; ROLE_LABEL: Record<string, string> }

export function loadKbFile(file: 'technical-support-kb.js' | 'site-assistant-kb.js'): Kb {
    const filePath = path.join(process.cwd(), 'public', 'technical-support', file)
    const code = fs.readFileSync(filePath, 'utf-8')
    const sandboxModule: { exports: Partial<Kb> } = { exports: {} }
    const context = vm.createContext({ module: sandboxModule, window: undefined })
    vm.runInContext(code, context, { filename: filePath })
    return sandboxModule.exports as Kb
}

// Facts not covered by the scripted KB. Add more here as clients ask new questions.
const EXTRA_FACTS = `
- Deleting / closing an account (Right to Erasure): users cannot delete their own account from the portal. They request it by emailing privacy@marinadubson.com (include full name and contact details and the account email), or via the Contact page / GDPR page (/gdpr). Logged-in users can also send a request to the admin through Messages. Deletion is subject to legal record-retention requirements (e.g. transcripts and invoices may need to be kept).
- Other data rights (access, correction, portability, restriction, objection) are requested the same way. See /privacy and /gdpr.
- Forgotten password: click "Forgot password?" on the Login page; self-service reset is not enabled yet, so it directs users to contact team@marinadubson.com.
- Registering: clients sign up at /register/client, court reporters at /register/reporter.
`

function kbToText(kb: Kb, role: string): string {
    return kb.KB
        .filter((it) => it.roles.includes(role))
        .map((it) => `- [${it.id}] (keywords: ${it.kw.slice(0, 6).join(', ')}) ${it.a.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&')}`)
        .join('\n')
}

export async function askLLM(opts: {
    question: string
    page?: string
    roleLabel: string
    knowledge: string
    audience: 'portal' | 'public'
}): Promise<string | null> {
    const key = process.env.OPENROUTER_API_KEY
    if (!key) return null

    const system = `You are the ${opts.audience === 'portal' ? 'Technical Support assistant inside the Marina Dubson court-reporting portal' : 'Marina Dubson Assistant on the public website of Marina Dubson, a court reporter'}.
The user is: ${opts.roleLabel}. Current page: ${opts.page || 'unknown'}.

RULES:
- Answer ONLY questions about Marina Dubson's services, website and portal, using the KNOWLEDGE below. Explain HOW the user can do things (which page, which button, who to contact).
- You CANNOT perform any actions (no deleting, changing, booking, cancelling, paying). If asked, explain the steps or who to contact.
- Never invent prices, dates, policies or features not in the KNOWLEDGE. If you don't know, say so and suggest ${opts.audience === 'portal' ? 'Messages (to reach the admin)' : 'the Contact page'}.
- Never reveal other users' data. No legal advice.
- Politely decline unrelated topics.
- Be concise (2-6 sentences, or short numbered steps). Reply in simple HTML only (<strong>, <br>, <ul><li>, and <a href="/page"> links to site pages); no markdown.

KNOWLEDGE:
${opts.knowledge}
${EXTRA_FACTS}`

    try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 20000)
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${key}`,
                'Content-Type': 'application/json',
                'X-Title': 'Marina Dubson Assistant',
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
                temperature: 0.2,
                max_tokens: 700,
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: opts.question },
                ],
            }),
        })
        clearTimeout(timer)
        if (!res.ok) {
            console.error('[assistant] OpenRouter error', res.status, await res.text().catch(() => ''))
            return null
        }
        const data = await res.json()
        const text: string | undefined = data?.choices?.[0]?.message?.content
        if (!text) return null
        // strip any script/style/handlers the model might emit
        return text
            .replace(/<\s*(script|style|iframe)[\s\S]*?<\/\s*\1\s*>/gi, '')
            .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, '')
            .replace(/```(html)?/g, '')
            .trim()
    } catch (e) {
        console.error('[assistant] OpenRouter request failed', e)
        return null
    }
}

export { kbToText }
