import type { Metadata } from 'next'
import Image from 'next/image'
import { Phone, Mail, Clock3 } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Under Maintenance | Marina Dubson Stenographic Services',
    description: 'Marina Dubson Stenographic Services is temporarily under maintenance. We’ll be back soon.',
    robots: { index: false, follow: false },
}

export default function MaintenancePage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B0B0C] font-poppins text-white">
            {/* Atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/home-cta-bg.png"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#0B0B0C]/88 to-[#0B0B0C]" />
                <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#D9C035]/10 blur-[100px]" />
                <div className="absolute -right-16 bottom-20 h-80 w-80 rounded-full bg-[#B8860B]/15 blur-[110px]" />
            </div>

            <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 pt-10 md:pt-14">
                <Image
                    src="/latest-logo.png"
                    alt="Marina Dubson, Stenographer"
                    width={2286}
                    height={594}
                    priority
                    className="h-12 w-auto object-contain md:h-14"
                />
            </header>

            <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center md:py-20">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9C035]/40 bg-[#D9C035]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-[#D9C035]">
                    <Clock3 className="h-3.5 w-3.5" />
                    Under Maintenance
                </div>

                <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-[68px]">
                    Coming{' '}
                    <span className="text-transparent [-webkit-text-stroke:1.4px_white]">Soon</span>
                </h1>

                <div className="mx-auto mt-6 h-[2px] w-24 bg-[#D9C035]" />

                <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-white/80 md:text-lg">
                    We&apos;re refreshing Marina Dubson Stenographic Services to serve you better.
                    The website will be back online shortly.
                </p>

                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                    Thank you for your patience
                </p>

                <div className="mt-12 grid w-full gap-4 sm:grid-cols-2">
                    <a
                        href="tel:+19174941859"
                        className="flex items-center justify-center gap-3 rounded-md border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-colors hover:border-[#D9C035]/50 hover:bg-white/10"
                    >
                        <Phone className="h-4 w-4 text-[#D9C035]" />
                        +1 (917) 494-1859
                    </a>
                    <a
                        href="mailto:MarinaDubson@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-md bg-[#D9C035] px-6 py-4 text-sm font-bold text-gray-900 transition-colors hover:bg-[#B8860B]"
                    >
                        <Mail className="h-4 w-4" />
                        MarinaDubson@gmail.com
                    </a>
                </div>
            </main>

            <footer className="relative z-10 pb-10 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-white/35">
                Marina Dubson Stenographic Services
            </footer>
        </div>
    )
}
