import { Routes, Route } from "react-router"
import LoginPage from "./pages/LoginPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import AdminPage from "./pages/AdminPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App

