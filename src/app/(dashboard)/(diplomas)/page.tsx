
import TitleHeader from "./../components/title-header"
import DiplomasBlocks from "./_components/diplomas-block"
import { GraduationCap } from "lucide-react"

export default function Diplomas() {
    return (
        <>
            {/* title header */}
            <TitleHeader title="Diplomas" icon={<GraduationCap className="w-11 h-11 text-white" />}/>

            {/* content diplomas */}
            <DiplomasBlocks/>
        </>
    )
}
