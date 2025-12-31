"use client";

import { useForget } from "./_components/providers/forget-provider";
import ForgetPasswordForm from "./_components/forget-form";
import OtpForm from "./_components/otp-form";
import ResetPasswordForm from "./_components/reset-password.form";
import Link from "next/link";

export default function ForgetPassword() {

    // usecontext forget provider
    const {step} = useForget();

    return (
        <div className="flex  justify-center flex-col px-33 ">

            {/*forgetPasswordForm component  */}
            {step===1 && <ForgetPasswordForm/>}

            {/*otpForm component */}
            {step===2 && <OtpForm/>}

            {/*resetPasswordForm component */}
            {step===3 && <ResetPasswordForm/>}

             {/* register button */}
            <p className="text-gray-500  text-sm text-center">
                Don’t have an account?
                <Link href="/register" className="text-blue-600 ml-2"> Create yours</Link>
            </p>
     </div>
    )
};
