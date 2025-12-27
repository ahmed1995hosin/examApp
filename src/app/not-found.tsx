"use client"
// import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-blue-50">
      <h2 className="text-3xl font-bold font-inter text-blue-600">404 - Not Found</h2>
          {/* <Link href="/" className="mt-4 text-lg text-blue-500 underline">Go Back</Link> */}
          <button className="mt-4 text-lg text-blue-500 underline" onClick={() => router.push("/")}>Go Back</button>
    </div>
  )
}
