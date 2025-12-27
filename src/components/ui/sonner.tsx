"use client"

import {
  Check,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <Check className="h-4 w-4 text-green-500" />,
        info: <Info className="h-4 w-4 text-blue-500" />,
        warning: <TriangleAlert className="h-4 w-4 text-yellow-500" />,
        error: <OctagonX className="h-4 w-4 text-red-500" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:w-100 group-[.toaster]:pl-4 group-[.toaster]:bg-gray-800 group-[.toaster]:py-3.5 group-[.toaster]:text-white group-[.toaster]:text-sm group-[.toaster]:border-border group-[.toaster]:rounded-none group-[.toaster]:shadow-black/20",
          description: "",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",

          success: "group-[.toast]:border-blue-600  ",
          info: "group-[.toast]:bg-blue-600", 
          warning: "group-[.toast]:bg-yellow-600",
          error: "group-[.toast]:bg-red-600 group-[.toaster]:border-red-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
