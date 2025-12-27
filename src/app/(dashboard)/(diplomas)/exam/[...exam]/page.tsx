import { CircleQuestionMark } from "lucide-react";
import TitleHeader from "@/app/(dashboard)/components/title-header";
import ExamQuestions from "../../_components/exam-questions";

type Props = {
    params: {
        exam: string[];
    }
}

export default function page({params}:Props) {

    // get params title
    const slug = params.exam[0];
    const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <>
            {/* title header */}
            <TitleHeader title={`[${title}] Questions`} icon={<CircleQuestionMark className="w-11 h-11 text-white" />}/>

            {/* content exam questions */}
            <ExamQuestions examId={params.exam[1]}/>
        </>
    )
}
