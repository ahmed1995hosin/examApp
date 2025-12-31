import { CircleQuestionMark } from "lucide-react";
import TitleHeader from "@/app/(dashboard)/_components/title-header";
import ExamQuestions from "../../_components/exam-questions";
import { Metadata } from "next";

type Props = {
    params: {
        exam: string[];
    }
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.exam[0];

  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${title} `,
    description: `${title} exam `,
  };
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
