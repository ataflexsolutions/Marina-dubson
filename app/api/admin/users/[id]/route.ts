import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                assignedTasks: {
                    orderBy: { createdAt: 'desc' }
                },
                createdTasks: {
                    orderBy: { createdAt: 'desc' }
                },
                contact: true
            }
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Fetch user error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const payload = token ? verifyToken(token) : null
        if (!payload || !['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(String(payload.role || '').toUpperCase())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const id = params.id
        const body = await request.json()
        const {
            firstName, lastName, email, avatar, certification, company, bio,
            portfolio, availability, basePageRate, baseAppearanceFee,
            baseMinimumFee, paymentPreference, taxId, approvalStatus
        } = body

        const updateData: any = {
            firstName,
            lastName,
            email,
            avatar,
            certification,
            company,
            bio,
            portfolio,
            availability,
            basePageRate: basePageRate !== undefined && basePageRate !== null && basePageRate !== '' ? parseFloat(basePageRate) : undefined,
            baseAppearanceFee: baseAppearanceFee !== undefined && baseAppearanceFee !== null && baseAppearanceFee !== '' ? parseFloat(baseAppearanceFee) : undefined,
            baseMinimumFee: baseMinimumFee !== undefined && baseMinimumFee !== null && baseMinimumFee !== '' ? parseFloat(baseMinimumFee) : undefined,
            paymentPreference,
            taxId,
        }

        if (approvalStatus && ['PENDING', 'APPROVED', 'REJECTED'].includes(approvalStatus)) {
            updateData.approvalStatus = approvalStatus
        }

        // Drop undefined keys so partial updates (approve/reject) don't wipe fields
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) delete updateData[key]
        })

        if (body.contact) {
            updateData.contact = {
                update: {
                    rating: body.contact.rating ? parseInt(body.contact.rating) : undefined,
                    isBlacklisted: body.contact.isBlacklisted !== undefined ? body.contact.isBlacklisted : undefined,
                    blacklistReason: body.contact.blacklistReason,
                    internalStaffNotes: body.contact.internalStaffNotes,
                    customPricingEnabled: body.contact.customPricingEnabled,
                    rateTier: body.contact.rateTier,
                    pricingNotes: body.contact.pricingNotes
                }
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData,
            include: {
                assignedTasks: {
                    orderBy: { createdAt: 'desc' }
                },
                createdTasks: {
                    orderBy: { createdAt: 'desc' }
                },
                contact: true
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Update user error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const payload = token ? verifyToken(token) : null
        if (!payload || !['ADMIN', 'MANAGER', 'SUPER_ADMIN'].includes(String(payload.role || '').toUpperCase())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const id = params.id
        try {
            await prisma.user.delete({ where: { id } })
            return NextResponse.json({ message: 'User deleted successfully', removed: true })
        } catch (deleteError) {
            // If FK constraints block hard delete, reject/block the account instead
            console.warn('Hard delete failed, rejecting account instead:', deleteError)
            await prisma.user.update({
                where: { id },
                data: { approvalStatus: 'REJECTED' },
            })
            return NextResponse.json({
                message: 'User could not be fully erased (linked records). Account blocked instead.',
                removed: false,
                approvalStatus: 'REJECTED',
            })
        }
    } catch (error) {
        console.error('Delete user error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
