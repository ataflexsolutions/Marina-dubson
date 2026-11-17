'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import {
    Search,
    ArrowRight,
    User,
    Award,
    Calendar,
    Mail,
    Loader2,
    MoreHorizontal,
    ShieldCheck,
    Clock,
    Check,
    Trash2,
    X,
} from 'lucide-react'

interface Reporter {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    createdAt: string
    avatar?: string | null
    certification?: string | null
    approvalStatus?: string | null
}

export default function ReportersPage() {
    const router = useRouter()
    const [users, setUsers] = useState<Reporter[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')
    const [busyId, setBusyId] = useState<string | null>(null)

    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const res = await fetch('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (!res.ok) throw new Error('Failed to fetch users')

            const data = await res.json()
            const reporters = (data.users || []).filter((u: any) => u.role === 'REPORTER')
            setUsers(reporters)
        } catch (error) {
            console.error('Failed to fetch reporters:', error)
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const updateStatus = async (id: string, approvalStatus: 'APPROVED' | 'REJECTED') => {
        setBusyId(id)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approvalStatus }),
            })
            if (!res.ok) throw new Error('Update failed')
            await fetchUsers()
        } catch (e) {
            console.error(e)
            alert('Could not update reporter status.')
        } finally {
            setBusyId(null)
        }
    }

    const removeReporter = async (id: string, name: string) => {
        if (!confirm(`Remove ${name}? This erases the account if possible, or blocks it if linked records exist.`)) {
            return
        }
        setBusyId(id)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error(data.error || 'Delete failed')
            if (data.removed === false) {
                alert(data.message || 'Account blocked (could not fully erase due to linked records).')
            }
            await fetchUsers()
        } catch (e) {
            console.error(e)
            alert('Could not remove reporter.')
        } finally {
            setBusyId(null)
        }
    }

    const filteredUsers = useMemo(() => {
        let list = users || []
        if (filter !== 'ALL') {
            list = list.filter((u) => (u.approvalStatus || 'APPROVED') === filter)
        }
        if (!searchQuery) return list
        const query = searchQuery.toLowerCase()
        return list.filter(
            (u) =>
                u.firstName?.toLowerCase().includes(query) ||
                u.lastName?.toLowerCase().includes(query) ||
                u.email?.toLowerCase().includes(query)
        )
    }, [users, searchQuery, filter])

    const pendingCount = users.filter((u) => (u.approvalStatus || 'APPROVED') === 'PENDING').length

    return (
        <div className="max-w-[1600px] w-[95%] mx-auto p-6 lg:p-12 space-y-12 pb-24 animate-in fade-in duration-700">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-black text-foreground tracking-tight uppercase leading-none">
                        Master <span className="brand-gradient italic">Stenographers</span>
                    </h1>
                    <p className="text-muted-foreground font-medium font-poppins text-[9px] tracking-[0.3em] uppercase">
                        Vet and manage court reporters in the MD network.
                        {!loading && (
                            <span className="text-primary ml-2 italic">
                                {' '}
                                • {users.length} reporters
                                {pendingCount > 0 ? ` · ${pendingCount} pending approval` : ''}
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex rounded-xl border border-border overflow-hidden text-[8px] font-black uppercase tracking-widest">
                        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={`px-3 py-2.5 transition-colors ${
                                    filter === f
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="relative group w-full sm:w-auto font-poppins">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:min-w-[280px] pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-[9px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary/10 text-foreground transition-all"
                            placeholder="Search reporters..."
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-40">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center py-32 glass-panel rounded-[3rem] border border-border">
                    <User className="h-20 w-20 text-muted-foreground/20 mx-auto mb-6" />
                    <p className="font-black text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        No reporters found
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">
                        Adjust filters or wait for new reporter applications.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredUsers.map((user) => (
                        <ReporterCard
                            key={user.id}
                            user={user}
                            busy={busyId === user.id}
                            onApprove={() => updateStatus(user.id, 'APPROVED')}
                            onReject={() => updateStatus(user.id, 'REJECTED')}
                            onRemove={() =>
                                removeReporter(
                                    user.id,
                                    `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function ReporterCard({
    user,
    busy,
    onApprove,
    onReject,
    onRemove,
}: {
    user: Reporter
    busy: boolean
    onApprove: () => void
    onReject: () => void
    onRemove: () => void
}) {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
    const initials =
        (user.firstName?.[0] || user.email[0]).toUpperCase() + (user.lastName?.[0] || '').toUpperCase()
    const joined = format(new Date(user.createdAt), 'MMM yyyy').toUpperCase()
    const status = user.approvalStatus || 'APPROVED'
    const avatarSrc = user.avatar || '/favicon.svg'

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
        }
        if (menuOpen) document.addEventListener('mousedown', onDoc)
        return () => document.removeEventListener('mousedown', onDoc)
    }, [menuOpen])

    return (
        <div className="glass-panel group p-6 rounded-[2rem] hover:shadow-2xl transition-all relative overflow-visible bg-card border border-border">
            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-primary to-indigo-800 flex items-center justify-center text-primary-foreground font-black text-sm shadow-md overflow-hidden relative">
                        {user.avatar ? (
                            <img
                                src={avatarSrc}
                                alt={name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    ;(e.currentTarget as HTMLImageElement).src = '/favicon.svg'
                                }}
                            />
                        ) : (
                            initials
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-black text-foreground uppercase tracking-tight line-clamp-1">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-[6px] font-black text-primary uppercase tracking-widest border border-primary/20">
                                Reporter
                            </span>
                            {user.certification ? (
                                <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest">
                                    {user.certification}
                                </span>
                            ) : (
                                <span className="text-[7px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                    No cert listed
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        aria-label="Reporter actions"
                        disabled={busy}
                        onClick={() => setMenuOpen((v) => !v)}
                        className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                    >
                        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MoreHorizontal className="h-3.5 w-3.5" />}
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 top-9 z-50 w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden py-1">
                            {status !== 'APPROVED' && (
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                                    onClick={() => {
                                        setMenuOpen(false)
                                        onApprove()
                                    }}
                                >
                                    <Check className="h-3.5 w-3.5" /> Approve
                                </button>
                            )}
                            {status !== 'REJECTED' && (
                                <button
                                    type="button"
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                                    onClick={() => {
                                        setMenuOpen(false)
                                        onReject()
                                    }}
                                >
                                    <X className="h-3.5 w-3.5" /> Reject / Block
                                </button>
                            )}
                            <button
                                type="button"
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                                onClick={() => {
                                    setMenuOpen(false)
                                    onRemove()
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5" /> Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 space-y-2 relative z-10">
                <div className="flex items-center justify-between text-muted-foreground gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <Mail className="h-2.5 w-2.5 text-primary/50 shrink-0" />
                        <span className="text-[8px] font-bold truncate">{user.email}</span>
                    </div>
                    {status === 'APPROVED' ? (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 shrink-0">
                            <ShieldCheck className="h-2 w-2 text-indigo-600" />
                            <span className="text-[5px] font-black text-indigo-600 uppercase tracking-widest">
                                Approved
                            </span>
                        </div>
                    ) : status === 'PENDING' ? (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 shrink-0">
                            <Clock className="h-2 w-2 text-amber-600" />
                            <span className="text-[5px] font-black text-amber-600 uppercase tracking-widest">
                                Pending
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-500/10 shrink-0">
                            <X className="h-2 w-2 text-rose-600" />
                            <span className="text-[5px] font-black text-rose-600 uppercase tracking-widest">
                                Rejected
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-2.5 w-2.5 text-primary/50" />
                    <span className="text-[8px] font-bold uppercase tracking-tight">Joined {joined}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between relative z-10 gap-2">
                {status === 'PENDING' ? (
                    <button
                        type="button"
                        disabled={busy}
                        onClick={onApprove}
                        className="luxury-button flex items-center gap-1.5 px-3 py-2 text-[7px] bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Award className="h-2.5 w-2.5" /> Approve now
                    </button>
                ) : (
                    <span className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest">
                        {status === 'APPROVED' ? 'Vetted reporter' : 'Blocked'}
                    </span>
                )}
                <button
                    type="button"
                    onClick={() => router.push(`/admin/reporters/${user.id}`)}
                    className="luxury-button flex items-center gap-1.5 px-3 py-2 text-[7px]"
                >
                    Profile <ArrowRight className="h-2.5 w-2.5" />
                </button>
            </div>
        </div>
    )
}
