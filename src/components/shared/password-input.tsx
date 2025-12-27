"use client";

import * as React from "react"
import { cn } from "@/lib/utils/tailwind-merge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  error?: boolean
}

const PasswordInput=React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error=false, ...props }, ref) => {

    // state
    const[showPassword, setShowPassword]=React.useState<boolean>(false)

    return (
        <div className="relative">
                <Input 
                type={showPassword? "text" : "password"}
                error={error} 
                {...props}
                ref={ref}
                className={cn('pr-3.5', className)}
                />
                <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 pr-3.5 h-full hover:bg-transparent"
          onClick={()=> setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
            </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
