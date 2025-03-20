"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router"
import { User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { dummyCustomers } from "../lib/dummy-data"
import { addLoginAttempt } from "../lib/login-attempts"

export function LoginForm() {
  const [customerId, setCustomerId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check if customer ID exists in our dummy data
    const customer = dummyCustomers.find((c) => c.id === customerId)

    if (customer) {
      // Store customer info in sessionStorage for the OTP page
      sessionStorage.setItem("currentCustomer", JSON.stringify(customer));

      // Record successful login attempt
      addLoginAttempt({
        userId: customer.id,
        wrongId: null,
        timestamp: new Date(),
        success: true
      });

      navigate("/verify-otp")
    } else {
      // Record failed login attempt
      addLoginAttempt({
        userId: null,
        wrongId: customerId,
        timestamp: new Date(),
        success: false
      });

      setError("The Customer ID you entered is incorrect.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <User className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="ENTER CUSTOMER ID"
          className="pl-10"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
      </div>

      {error && <p className="mb-4 text-sm text-[#E32213] font-bold bg-[#FBE8E7] p-2 rounded-md">{error}</p>}

      <Button type="submit" className="w-full bg-[#E32213] hover:bg-red-700 text-white">
        Continue
      </Button>
    </form>
  )
}

