export type StaticBlog = {
    slug: string
    title: string
    excerpt: string
    date: string
    author: string
    content: string
}

export const staticBlogs: StaticBlog[] = [
    {
        slug: 'deposition-best-practices',
        title: 'Deposition Best Practices',
        excerpt: 'Simple habits that help depositions run cleanly — from exhibits and spelling lists to pacing and Realtime readiness.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>A clean deposition record starts before anyone says “on the record.” A few small preparations make the day smoother for counsel, witnesses, and the reporter.</p>
<h2>Share what the reporter needs early</h2>
<p>Send case captions, party names, unusual spellings, and exhibit lists ahead of time when you can. Technical terms, product names, and medical vocabulary are much easier to capture accurately with a short advance list.</p>
<h2>Set the room up for a clear record</h2>
<p>One speaker at a time, microphones that work, and a pace that lets questions finish before answers begin. Overlapping speech is the fastest way to muddy a transcript.</p>
<h2>If you want Realtime, say so up front</h2>
<p>Realtime is most useful when everyone knows it is running and how counsel will view the feed. Confirm connections, devices, and any rough or daily transcript needs before the first question.</p>
<p>Those basics keep the focus on the testimony — not on scrambling mid-session.</p>
`,
    },
    {
        slug: 'court-reporting-checklist',
        title: 'A Court Reporting Checklist',
        excerpt: 'What to confirm before the job starts so coverage, logistics, and transcript delivery stay on track.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>Use this checklist when you book a reporter so the assignment starts clean and finishes on schedule.</p>
<ul>
<li><strong>Date, time, and time zone</strong> — including expected length and any second session.</li>
<li><strong>Location or remote platform</strong> — address, Zoom/Teams link, dial-in, and who hosts.</li>
<li><strong>Proceeding type</strong> — deposition, arbitration, hearing, CART, or trial coverage.</li>
<li><strong>Realtime / rough / daily needs</strong> — and who should receive each deliverable.</li>
<li><strong>Parties and spellings</strong> — names, companies, and specialty terms.</li>
<li><strong>Exhibits</strong> — how they will be marked and shared.</li>
<li><strong>Transcript instructions</strong> — format, rush timing, and billing contacts.</li>
</ul>
<p>Confirming these details early prevents most last-minute coverage and turnaround problems.</p>
`,
    },
    {
        slug: 'keeping-proceedings-smooth',
        title: 'Keeping Proceedings Smooth',
        excerpt: 'Practical tips for quieter rooms, clearer speakers, and fewer interruptions when the record matters.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>The best transcripts come from rooms that make listening easy. You do not need a perfect studio — just intentional habits.</p>
<h2>Protect the audio</h2>
<p>Close doors, mute notifications, and keep side conversations off the record. In remote proceedings, ask participants to use a headset and a quiet space when possible.</p>
<h2>Protect the pace</h2>
<p>Pause between question and answer. Ask speakers to identify themselves when the room is crowded. If an answer is inaudible, it is better to stop and clarify than to guess later.</p>
<h2>Protect the exhibits</h2>
<p>Mark exhibits in order and announce the number out loud. When everyone can follow the paper trail, the written record stays aligned with what happened in the room.</p>
`,
    },
    {
        slug: 'avoiding-transcript-delays',
        title: 'Avoiding Transcript Delays',
        excerpt: 'How early coordination on roughs, dailies, and certified finals keeps turnaround predictable.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>Transcript delays usually start with unclear delivery expectations, not with the reporting itself.</p>
<h2>Decide the deliverable before the job ends</h2>
<p>Do you need a rough draft the same day, a daily, or a certified final on a standard turnaround? Spell that out when you book — not after everyone has left the room.</p>
<h2>Name the recipients</h2>
<p>Who gets the rough? Who gets the certified copy? Who handles billing? Clear contacts keep files from sitting in the wrong inbox.</p>
<h2>Share corrections once, completely</h2>
<p>If counsel has spelling updates or party name fixes, send them in one list as soon as possible. Piecemeal edits slow certification more than almost anything else.</p>
`,
    },
    {
        slug: 'realtime-without-the-stress',
        title: 'Realtime Without the Stress',
        excerpt: 'What counsel and coordinators can expect when Realtime is on — and how to get the most from the feed.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>Realtime lets you read testimony as it is spoken. Used well, it is a calm advantage — not a distraction.</p>
<h2>What Realtime is for</h2>
<p>Marking key answers, catching inconsistencies, and following dense testimony without waiting for a draft. It is especially useful in long or technical depositions.</p>
<h2>What helps the feed stay clean</h2>
<p>Stable internet for remote jobs, one speaker at a time, and advance notice for unusual vocabulary. The clearer the room, the cleaner the live text.</p>
<h2>What to remember</h2>
<p>Realtime is a working tool during the proceeding. The certified transcript remains the official record after the job is complete.</p>
`,
    },
    {
        slug: 'notes-from-the-reporting-room',
        title: 'Notes from the Reporting Room',
        excerpt: 'Business updates, industry news, and field notes from day-to-day court reporting work in New York.',
        date: '2024-03-03',
        author: 'Marina Dubson',
        content: `
<p>This space is for practical notes from the field — how coverage is shifting, what coordinators are asking for, and what makes reporting days run better in New York.</p>
<p>Expect short updates on scheduling trends, remote versus in-person coverage, transcript turnaround, and the habits that keep high-stakes proceedings accurate.</p>
<p>If there is a reporting topic you want covered next — deposition logistics, Realtime setup, CART for events, or transcript workflow — reach out and ask. These posts stay focused on the work of court reporting.</p>
`,
    },
]

export function getStaticBlog(slug: string): StaticBlog | undefined {
    return staticBlogs.find((post) => post.slug === slug)
}
