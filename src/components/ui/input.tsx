import * as React from "react"

import { cn } from "@/lib/utils/tailwind-merge"
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  error?: boolean
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,error=false, ...props }, ref) => {
    return (
      <input placeholder=""
        type={type}
        className={cn(
          `flex  w-full px-2.5 py-3.5  transition-colors  border  bg-background  text-base ring-offset-background file:border-0 
          file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400
           focus-visible:outline-none 
           disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          // border depending on error
          error && "border-red-600 focus-visible:border-red-600",
          // border when focus
           "focus-visible:border-blue-600",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
