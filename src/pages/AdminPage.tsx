"use client";

import { useState } from "react";
import { LoginAttemptsTable } from "../components/login-attempts-table";
import logo from "../assets/logo.png"


export default function AdminPage() {
    const [showSuccessful, setShowSuccessful] = useState<boolean | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-center">
                    <img src={logo} alt="International Investment Bank, Ltd." width={286} height={40} />
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Login Attempts Dashboard</h1>
                        <p className="text-gray-600">Monitor customer login attempts and track incorrect ID entries</p>
                    </div>
                </div>

                <div className="mb-6 flex space-x-4">
                    <button
                        onClick={() => setShowSuccessful(null)}
                        className={`rounded-md px-4 py-2 text-sm font-medium ${showSuccessful === null
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        All Attempts
                    </button>
                    <button
                        onClick={() => setShowSuccessful(true)}
                        className={`rounded-md px-4 py-2 text-sm font-medium ${showSuccessful === true
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Successful Logins
                    </button>
                    <button
                        onClick={() => setShowSuccessful(false)}
                        className={`rounded-md px-4 py-2 text-sm font-medium ${showSuccessful === false
                            ? "bg-red-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        Failed Attempts
                    </button>
                </div>

                <div className="rounded-lg border bg-white shadow-sm">
                    <LoginAttemptsTable showSuccessful={showSuccessful} />
                </div>
            </div>
        </div>
    );
}
