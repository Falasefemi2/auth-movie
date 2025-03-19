import { LoginForm } from "../components/LoginForm";
import logo from "../assets/logo.png";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            {/* Logo container with fixed height */}
            <div className="w-full max-w-md mb-2 flex justify-center ">
                <img
                    src={logo}
                    alt="International Investment Bank, Ltd."
                    width={286}
                    height={40}
                />
            </div>
            {/* Fixed height container for the user icon and text (empty on login page) */}
            <div className="flex flex-col items-center w-full max-w-md h-[20px]">
                {/* Empty space to match the height of the other page */}
            </div>

            {/* Card with fixed dimensions */}
            <div className="bg-[#F5F5F5] rounded-md p-8 shadow-sm w-full max-w-md h-[400px] flex flex-col justify-between">
                <div className="mt-20">
                    <h2 className="text-center text-sm font-medium text-[#084086] mb-6">
                        Login to your Offshore Account
                    </h2>
                    <LoginForm />
                </div>

                <div className="text-center text-xs text-[#084086] mt-auto">
                    Copyright © 2025 International Investment Bank, Ltd.
                </div>
            </div>

            {/* Fixed height container for the notice text */}
            <div className="h-[24px] mt-4">
                <p className="text-center text-xs text-[#000000]">
                    Notice: Unauthorized use is prohibited. By proceeding, you confirm
                    that you are an authorized user.
                </p>
            </div>
        </div>
    );
}
