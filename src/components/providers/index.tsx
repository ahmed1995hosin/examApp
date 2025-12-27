import NextAuthProvider from "./components/next-auth-provider"
import { Toaster } from "@/components/ui/sonner"
import ReactQueryProvider from "./components/react-query-provider"
type Props = {
    children: React.ReactNode
}
export default function Providers({children}: Props) {
    return (
            <NextAuthProvider>
                <ReactQueryProvider>
                    {children}
                    <Toaster/>
                </ReactQueryProvider>
            </NextAuthProvider>
    )   
}
