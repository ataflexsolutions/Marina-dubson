import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { PublicHeader, PublicFooter } from '@/app/components/landing/PublicLayout'
import { MarinaCTA } from '@/app/components/landing/MarinaHomepage'

export const metadata: Metadata = {
    title: 'Blog | Court Reporting Insights from Marina Dubson',
    description: 'Deposition best practices, proceeding checklists, transcript tips, and industry updates from New York stenographic court reporter Marina Dubson.',
}

const blogCards = [
    {
        title: 'Deposition Best Practices',
        slug: 'deposition-best-practices',
        image: '/blog-1.png',
        date: 'March 3, 2024',
        excerpt: 'Simple habits that help depositions run cleanly — from exhibits and spelling lists to pacing and Realtime readiness.',
    },
    {
        title: 'A Court Reporting Checklist',
        slug: 'court-reporting-checklist',
        image: '/blog-2.png',
        date: 'March 3, 2024',
        excerpt: 'What to confirm before the job starts so coverage, logistics, and transcript delivery stay on track.',
    },
    {
        title: 'Keeping Proceedings Smooth',
        slug: 'keeping-proceedings-smooth',
        image: '/blog-3.png',
        date: 'March 3, 2024',
        excerpt: 'Practical tips for quieter rooms, clearer speakers, and fewer interruptions when the record matters.',
    },
    {
        title: 'Avoiding Transcript Delays',
        slug: 'avoiding-transcript-delays',
        image: '/blog-4.png',
        date: 'March 3, 2024',
        excerpt: 'How early coordination on roughs, dailies, and certified finals keeps turnaround predictable.',
    },
    {
        title: 'Realtime Without the Stress',
        slug: 'realtime-without-the-stress',
        image: '/blog-5.png',
        date: 'March 3, 2024',
        excerpt: 'What counsel and coordinators can expect when Realtime is on — and how to get the most from the feed.',
    },
    {
        title: 'Notes from the Reporting Room',
        slug: 'notes-from-the-reporting-room',
        image: '/blog-6.png',
        date: 'March 3, 2024',
        excerpt: 'Business updates, industry news, and field notes from day-to-day court reporting work in New York.',
    },
]

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-[#eef4fb] font-sans text-white">
            <PublicHeader />

            <main>
                <section className="relative flex min-h-[720px] items-center overflow-hidden bg-[#101820] lg:min-h-[860px]">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/blog-hero-bg.png"
                            alt="Court reporting insights from Marina Dubson"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-black/45" />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 md:px-8">
                        <div className="ml-auto max-w-3xl text-white">
                            <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-[72px]">
                                Court <span className="text-transparent [-webkit-text-stroke:1.4px_white]">Reporting</span>
                                <br />
                                Insights
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm font-medium text-white/80 md:text-base">
                                Deposition best practices, proceeding checklists, and industry updates from the reporting room — not lawyer briefings.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-16 inline-flex items-center justify-center rounded-md border border-white/80 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#B8860B]"
                            >
                                Contact Marina
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-px leading-none">
                        <Image src="/about-us-svg.png" alt="" width={1440} height={104} className="h-auto w-full object-cover" />
                    </div>
                </section>

                <section className="relative overflow-hidden bg-[#D9C035] pb-28 pt-16 md:pb-40 md:pt-24 text-gray-900">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-gray-900/70">Blog</p>
                            <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
                                Marina Dubson
                                <br />
                                Blog
                            </h2>
                            <p className="mx-auto mt-5 max-w-xl text-sm font-medium leading-relaxed text-gray-900/75">
                                Practical guidance for smoother proceedings, cleaner transcripts, and day-to-day court reporting work.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                            {blogCards.map((blog) => (
                                <article
                                    key={blog.slug}
                                    className="overflow-hidden rounded-lg border border-gray-900/25 bg-[#D9C035] shadow-lg"
                                >
                                    <div className="relative aspect-[1.36] overflow-hidden bg-[#B8860B]">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover object-center"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold leading-snug text-gray-950">{blog.title}</h3>
                                        <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-900/55">
                                            <Clock className="h-3.5 w-3.5" />
                                            {blog.date}
                                        </div>
                                        <p className="mt-4 text-sm font-medium leading-relaxed text-gray-900/80">
                                            {blog.excerpt}
                                        </p>
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-900/50 px-5 py-2.5 text-xs font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-[#D9C035]"
                                        >
                                            Learn More <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-14 text-center">
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-3 text-sm font-bold text-[#B8860B] shadow-md transition-colors hover:bg-[#eef4fb]"
                            >
                                See More <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="bg-[#eef4fb] leading-none">
                    <Image src="/about-us-svg-inverted.png" alt="" width={1440} height={104} className="h-auto w-full object-cover" />
                </div>

                <div className="bg-[#eef4fb] pb-8 pt-20">
                    <MarinaCTA />
                </div>
            </main>

            <PublicFooter />
        </div>
    )
}
