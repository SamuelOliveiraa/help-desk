import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'

export default function TableLoadingSkeleton() {
    return (
        <>
            <TableRow>
                <TableCell colSpan={4} className="p-4">
                    <Skeleton className="w-full h-14 rounded-lg block" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} className="p-4">
                    <Skeleton className="w-full h-14 rounded-lg block" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} className="p-4">
                    <Skeleton className="w-full h-14 rounded-lg block" />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={4} className="p-4">
                    <Skeleton className="w-full h-14 rounded-lg block" />
                </TableCell>
            </TableRow>
        </>
    )
}
