"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    getLoginAttempts,
    getLoginAttemptsByStatus,
    LoginAttempt
} from "../lib/login-attempts";

interface LoginAttemptsTableProps {
    showSuccessful: boolean | null;
}

export function LoginAttemptsTable({ showSuccessful }: LoginAttemptsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [paginatedData, setPaginatedData] = useState<{
        data: LoginAttempt[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>({
        data: [],
        total: 0,
        page: 1,
        pageSize: 5,
        totalPages: 0
    });

    useEffect(() => {
        // Reset to first page when filter changes
        setCurrentPage(1);
    }, [showSuccessful]);

    useEffect(() => {
        let data;

        if (showSuccessful === null) {
            data = getLoginAttempts(currentPage, pageSize);
        } else {
            data = getLoginAttemptsByStatus(showSuccessful, currentPage, pageSize);
        }

        setPaginatedData(data);
    }, [currentPage, pageSize, showSuccessful]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < paginatedData.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Attempt ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                User ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Wrong ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedData.data.map((attempt) => (
                            <tr key={attempt.id} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {attempt.id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {attempt.userId || "-"}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {attempt.wrongId ? (
                                        <span className="font-medium text-red-600">{attempt.wrongId}</span>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {format(new Date(attempt.timestamp), "MMM dd, yyyy HH:mm:ss")}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    {attempt.success ? (
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                            Success
                                        </span>
                                    ) : (
                                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                            Failed
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {paginatedData.data.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                                    No login attempts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-3">
                <div className="text-sm text-gray-500">
                    Showing {paginatedData.data.length > 0 ? (paginatedData.page - 1) * paginatedData.pageSize + 1 : 0} to{" "}
                    {Math.min(paginatedData.page * paginatedData.pageSize, paginatedData.total)} of {paginatedData.total} entries
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`rounded-md p-2 ${currentPage === 1
                            ? "cursor-not-allowed text-gray-400"
                            : "text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-gray-700">
                        Page {currentPage} of {paginatedData.totalPages}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === paginatedData.totalPages || paginatedData.totalPages === 0}
                        className={`rounded-md p-2 ${currentPage === paginatedData.totalPages || paginatedData.totalPages === 0
                            ? "cursor-not-allowed text-gray-400"
                            : "text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
