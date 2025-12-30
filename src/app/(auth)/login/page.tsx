import Link from "next/link";
import LoginForm from "./_components/login-form";

// metadata
export const metadata = {
  title: "Login Exam App",
  description: "Login to start your exam journey",
};

export default function LoginPage() {
  return (
    <div className="flex  justify-center flex-col px-33 py-80 ">
      {/* heading login */}
      <h1 className="text-gray-800 text-3xl font-bold font-inter pb-6 text-left">
        Login
      </h1>

      {/* form */}
      <LoginForm />

      {/* register button */}
      <p className="text-gray-500  text-sm text-center">
        Don’t have an account?
        <Link href="/register" className="text-blue-600  ml-2">
          {" "}
          Create yours
        </Link>
      </p>
    </div>
  );
}
