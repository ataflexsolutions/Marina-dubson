import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import { PublicHeader, PublicFooter } from '../components/landing/PublicLayout'
import {
    MarinaHero,
    MarinaContact,
    MarinaTestimonials,
    MarinaCTA,
} from '../components/landing/MarinaHomepage'

export const metadata: Metadata = {
    title: 'Résumé & Notable Experience | Marina Dubson Court Reporter',
    description:
        "Marina Dubson's professional résumé — education, volunteer leadership, notable cases, and court reporting experience across New York and national assignments.",
}

type ResumeEntry = {
    dates: string
    title: string
    lines: string[]
}

const volunteer: ResumeEntry[] = [
    {
        dates: '03/21–pres.',
        title: 'New York State Court Reporters Association (NYSCRA)',
        lines: [
            'Board Member (11/21–pres.)',
            'Chair of the Social Media Committee (3/21–3/22)',
            'Creator and Editor-in-Chief of the “Reporter’s Digest” newsletter (3/21–11/24)',
            'Chair of the Reader’s Digest Committee (3/21–11/24)',
        ],
    },
]

const education: ResumeEntry[] = [
    {
        dates: '01/14–08/14',
        title: 'New York Career Institute (NYCI)',
        lines: ['Realtime/Closed Captioning/CART Certificate Program'],
    },
    {
        dates: '05/08–06/11',
        title: 'New York Career Institute (NYCI)',
        lines: ['A.O.S. in Court Reporting (Stenotype Court Reporter)'],
    },
    {
        dates: '09/03–08/07',
        title: 'Hunter College (CUNY)',
        lines: ['B.A. in English, Education (GPA: 3.87)'],
    },
]

const notableCases: { dates: string; items: string[] }[] = [
    {
        dates: '2025–2026',
        items: [
            'EB-5 Immigrant Investor Program class action lawsuits',
            'Gemini Earn bellwether cases',
            'Commission on Ethics and Lobbying in Government (COELIG) hearings',
            'Weiner, et al. v. Leland Stanford Junior University, et al.',
        ],
    },
    {
        dates: '2023–2024',
        items: [
            'Catholic School Abuse Scandal lawsuits; MeToo Movement cases, notably against Fox News, CBS, Bill O’Reilly, Tucker Carlson, Bloomberg, L.P., and others',
            'Arbitrations involving well-known fashion designers, such as Norma Kamali, Danielle Nicole, J. Crew, and others',
        ],
    },
    {
        dates: '2014',
        items: ['Zandra Bennett v. Orl’o Inc, Orlando Pita et al.'],
    },
    {
        dates: '2013',
        items: ['Brandi Johnson v. STRIVE East Harlem Employment Group et al.'],
    },
    {
        dates: '2012',
        items: ['Rebel Laura Ely v. Bridgewater Associates, LP.'],
    },
]

const experience: ResumeEntry[] = [
    {
        dates: '11/23–8/24',
        title:
            'Senior Court Reporter, Unified Court System, Manhattan Supreme Court — Criminal Term — Permanent-Contingent Civil Service Title',
        lines: [
            'Stenographically took down minutes of Supreme Court proceedings, including trials, hearings, and calendar calls.',
            'Produced and created physical transcripts of the proceedings upon request.',
            'Worked on daily and immediate delivery of minutes.',
        ],
    },
    {
        dates: '10/22–pres.',
        title:
            'Freelance Court Reporter for 25+ national and local agencies, including U.S. Legal Support, Everest Court Reporting, Aptus, Optima Juris, Steno Agency, Gregory Edwards, Toby Feldman, Veritext, Planet Depos, Realtime Reporting, Inc., EcoScribe Solutions, Henderson Legal Services, Albany Reporting, Esquire, Magna, and others.',
        lines: [
            'Stenographically took down and transcribed verbatim testimony in civil and federal matters such as personal injury, medical malpractice, fraud, breach-of-contract, intellectual property, workplace harassment/discrimination/EEO-related lawsuits, wrongful termination, and complex litigation.',
            'Depositions, arbitrations, trials, and hearings.',
        ],
    },
    {
        dates: '9/16–10/22',
        title:
            'Reporter/Stenographer (DA), Kings County District Attorney’s Office — Permanent Civil Service Title, Reporter/Stenographer (DA) Level 1A',
        lines: [
            'Accurately took down and transcribed verbatim testimony during Grand Jury proceedings.',
            'Submitted all certified minutes in a timely manner.',
            'Testified in court, as needed.',
        ],
    },
    {
        dates: '03/11–9/16',
        title:
            'Freelance Court Reporter, Diamond Reporting & Legal Video, Inc., U.S. Legal Support, Inc., American Stenographic, LLC, Barrister Reporting Services, Inc.',
        lines: [
            'Stenographically took down and transcribed verbatim testimony in civil and federal matters including personal injury (motor vehicle, slip and fall, construction-related), medical plaintiffs and doctors, business/financial disputes, fraud, accounting, matrimonial, workplace harassment/discrimination/EEO-related lawsuits, and wrongful termination.',
            'Depositions, arbitrations, trials, and hearings.',
        ],
    },
    {
        dates: '09/04–06/11',
        title: 'Reading/Writing Tutor, Hunter College Reading and Writing Center',
        lines: [
            'Tutored college students in English grammar, writing strategies, and essay organization across the curriculum.',
            'Tutored ESL students in writing, reading comprehension, and vocabulary building.',
            'Instructed weekly test-preparatory sessions for the CUNY Proficiency Exam (CPE).',
        ],
    },
    {
        dates: '08/06–05/07',
        title: 'English Instructor, Hunter College English Department',
        lines: [
            'Course: English 201: Intermediate Expository Writing.',
            'Prepared students for three expository essays (personal essay, stylistic analysis, and aesthetic response).',
            'Responsible for instruction and grades.',
        ],
    },
]

const honors = [
    'Hunter College and NYCI’s Dean’s List',
    'Golden Key International Honor Society',
    'Phi Beta Kappa Society, Nu Chapter of New York',
]

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
    return (
        <div className="mb-8 md:mb-10">
            <div className="mb-4 flex items-center gap-4">
                <div className="h-px w-24 bg-[#D9C035]" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B8860B]">{eyebrow}</p>
            </div>
            <h2 className="text-3xl uppercase leading-none tracking-tight text-gray-950 md:text-5xl">
                {title}
            </h2>
        </div>
    )
}

function EntryCard({ entry }: { entry: ResumeEntry }) {
    return (
        <div className="flex h-full flex-col gap-3 rounded-2xl border border-[#D9C035]/30 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">{entry.dates}</p>
            <h3 className="text-base font-black uppercase leading-snug tracking-tight text-gray-950">
                {entry.title}
            </h3>
            <ul className="mt-1 space-y-2">
                {entry.lines.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[15px] font-medium leading-relaxed text-gray-600">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9C035]" />
                        <span>{line}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function NotableExperiencePage() {
    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <PublicHeader />

            <main className="flex-1">
                <MarinaHero
                    bgImage="/notable.png"
                    dividerImage="/services-hero-svg.png"
                    imageClassName="object-cover object-[88%_22%] sm:object-[85%_20%] md:object-right"
                />

                {/* Intro / contact strip */}
                <section className="relative overflow-hidden bg-[#0B0B0C] py-16 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="h-px w-24 bg-[#D9C035]" />
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D9C035]">
                                Professional Profile
                            </p>
                        </div>
                        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div>
                                <h2 className="mb-5 text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
                                    <span className="font-normal">Marina </span>
                                    <span className="font-bold">Dubson</span>
                                </h2>
                                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#D9C035]">
                                    Marina Dubson Stenographic Services, LLC
                                </p>
                                <p className="max-w-2xl text-[15px] font-medium leading-relaxed text-white/80 md:text-base">
                                    Hard-working, detail-oriented and reliable reporter, who will produce high quality
                                    transcripts in a timely manner as well as conduct myself with professionalism.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-1">
                                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/90">
                                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#D9C035]" />
                                    <div className="text-sm font-medium leading-relaxed">
                                        <p>12A Saturn Lane</p>
                                        <p>Staten Island, NY 10314</p>
                                    </div>
                                </div>
                                <a
                                    href="tel:+19174941859"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/90 transition-colors hover:border-[#D9C035]/50"
                                >
                                    <Phone className="h-5 w-5 shrink-0 text-[#D9C035]" />
                                    (917) 494-1859
                                </a>
                                <a
                                    href="mailto:MarinaDubson@gmail.com"
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/90 transition-colors hover:border-[#D9C035]/50"
                                >
                                    <Mail className="h-5 w-5 shrink-0 text-[#D9C035]" />
                                    MarinaDubson@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notable Cases */}
                <section className="relative overflow-hidden bg-[#f4f6fa] py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <SectionHeading eyebrow="Notable Cases" title="High-Profile Proceedings" />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {notableCases.map((group) => (
                                <div
                                    key={group.dates}
                                    className="flex flex-col gap-4 rounded-2xl border border-[#D9C035]/30 bg-white p-6 shadow-sm"
                                >
                                    <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
                                        {group.dates}
                                    </p>
                                    <ul className="space-y-3">
                                        {group.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-[15px] font-medium leading-relaxed text-gray-700"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9C035]" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section className="relative overflow-hidden bg-white py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <SectionHeading eyebrow="Experience" title="Professional Timeline" />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {experience.map((entry) => (
                                <EntryCard key={`${entry.dates}-${entry.title}`} entry={entry} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Education + Volunteer */}
                <section className="relative overflow-hidden bg-[#f4f6fa] py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
                            <div>
                                <SectionHeading eyebrow="Education" title="Academic Path" />
                                <div className="grid gap-6">
                                    {education.map((entry) => (
                                        <EntryCard key={`${entry.dates}-${entry.title}`} entry={entry} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SectionHeading eyebrow="Volunteer Work" title="Industry Leadership" />
                                <div className="grid gap-6">
                                    {volunteer.map((entry) => (
                                        <EntryCard key={entry.title} entry={entry} />
                                    ))}
                                </div>
                                <div className="mt-10 rounded-2xl border border-[#D9C035]/30 bg-white p-6 shadow-sm">
                                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#B8860B]">
                                        Honors
                                    </p>
                                    <ul className="space-y-2">
                                        {honors.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-[15px] font-medium leading-relaxed text-gray-700"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9C035]" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-6 border-t border-gray-100 pt-5 text-sm font-medium text-gray-500">
                                        References available upon request.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <MarinaContact />
                <MarinaTestimonials />
                <div className="bg-[#f4f6fa] pb-16 pt-10">
                    <MarinaCTA
                        title="Request a Court Reporter Today"
                        buttonLabel="Request a Court Reporter"
                        href="/contact"
                    />
                </div>
            </main>

            <PublicFooter />
        </div>
    )
}
