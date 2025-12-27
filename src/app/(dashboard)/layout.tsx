import Sidebar from "./components/sidebar"
import HeaderBreadcrumb from "./components/header-breadcrumb"

type Props = {
    children: React.ReactNode
}
export default function Layout({children}: Props) {
    return (
        <>   
           <div className="flex min-h-screen columns-4">
                {/* sidebar  */}
                <Sidebar/>
                
                {/* Breadcrumb navigation and main content */}
                <div className="w-3/4 bg-gray-50">
                    {/* Breadcrumb navigation */}
                    <HeaderBreadcrumb/>
                    
                    {/* Main content */}
                     <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
