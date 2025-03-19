"use client"

import { useEffect, useState } from "react"
import { OtpForm } from "../components/OtpForm"
import { OtpHelpDialog } from "../components/otp-help-dialog"
import { useNavigate } from "react-router"

import logo from "../assets/logo.png"

export default function VerifyOtpPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [customerId, setCustomerId] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const customerData = sessionStorage.getItem("currentCustomer")

        if (!customerData) {
            navigate("/")
            return
        }

        const customer = JSON.parse(customerData)
        setFirstName(customer.firstname || "")
        setLastName(customer.lastname || "")
        setCustomerId(customer.customerID || "")
    }, [navigate])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* Logo container with fixed height */}
            <div className="w-full max-w-md mb-2 flex justify-center">
                <img src={logo || "/placeholder.svg"} alt="International Investment Bank, Ltd." width={286} height={40} />
            </div>

            {/* Fixed height container for the user icon and text */}
            <div className="flex flex-col items-center w-full max-w-md h-[20px]">
                {/* This matches the empty space in the login page */}
            </div>

            {/* Card with fixed dimensions */}
            <div className="bg-[#F5F5F5] rounded-md p-8 shadow-sm w-full max-w-md h-[400px] flex flex-col justify-between">
                <div className="mb-4 flex flex-col items-center">
                    <div className="rounded-full bg-[#F24822] p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="mt-2 text-sm font-medium text-[#084086]">
                        {" "}
                        Login as {lastName} {firstName}?
                    </h2>
                </div>

                <p className="mb-4 text-center text-xs text-[#00142C]">
                    OTP has been sent to your number ending with {customerId ? customerId.slice(-4) : ""}
                </p>

                <OtpForm />
                <div className="mt-4 text-right">
                    <OtpHelpDialog />
                </div>
                <div className="mt-auto text-center text-xs text-[#084086]">
                    Copyright © 2025 International Investment Bank, Ltd.
                </div>
            </div>

            {/* Fixed height container for the notice text */}
            <div className="h-[24px] mt-4">
                <p className="text-center text-xs text-[#000000]">
                    Notice: Unauthorized use is prohibited. By proceeding, you confirm that you are an authorized user.
                </p>
            </div>
        </div>
    )
}

