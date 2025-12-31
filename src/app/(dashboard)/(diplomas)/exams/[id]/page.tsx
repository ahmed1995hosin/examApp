import { BookOpenCheck } from "lucide-react";
import TitleHeader from "@/app/(dashboard)/_components/title-header";
import ExamsList from "../../_components/exams-list";
import { log } from "console";

type Props = {
    params: {
        id: string;
    };
};

export default function({params}:Props) {
    const { id } = params;
    return (
        <>
        {/* title header */}
        <TitleHeader title="Exams" icon={<BookOpenCheck className="w-11 h-11 text-white" />}/>

        {/* exams */}
        <ExamsList subjectId={id}/>
        </>
    )
}
