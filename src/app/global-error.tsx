"use client"

type ErrorProps = {
    error: Error,
    reset: () => void
}
export default function GlobalError({ error, reset }: ErrorProps) {
  
    return (
        <html>
            <body >
                <div className="flex items-center justify-center min-h-screen flex-col bg-blue-50">
                <h2 className="text-3xl font-bold text-center font-inter text-blue-600 mb-10">Something went wrong!</h2>
                <p className="text-red-500 text-center mb-7 text-2xl">{error.message}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={()=> reset()}> Try again</button>
                </div>
            </body>
        </html>
    );
}
