// User-facing guides the AI assistant reads. Each user only gets the guide for their own role.
import { ADMIN_GUIDE } from './admin'
import { CLIENT_GUIDE } from './client'
import { REPORTER_GUIDE } from './reporter'
import { PUBLIC_GUIDE } from './public'

export function guideForRole(role: 'admin' | 'private' | 'agency' | 'reporter' | 'visitor'): string {
    switch (role) {
        case 'admin':
            return ADMIN_GUIDE
        case 'reporter':
            return REPORTER_GUIDE
        case 'private':
        case 'agency':
            return CLIENT_GUIDE
        default:
            return PUBLIC_GUIDE
    }
}
