
import RegisterForm from "./_components/register-form";
import Link from "next/link";

// metadata
export const metadata = {
  title: "Register Exam App",
  description: "Create an account to start your exam journey",
}

export default function Register() {
  return (
    <div className="flex  justify-center flex-col px-33  ">
      {/* heading register */}
      <h1 className="text-gray-800 text-3xl font-bold font-inter pb-6 text-left">
        Create Account
      </h1>

      {/* form*/}
      <RegisterForm />

      {/*login button */}
      <p className="text-gray-500  text-sm text-center">
        Already have an account?
        <Link href="/login" className="text-blue-600  ml-2">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
}
