import TitleHeader from "./../components/title-header";
import DiplomasBlocks from "./_components/diplomas-block";
import { GraduationCap } from "lucide-react";

export const metadata = {
    title: "Diplomas",
    description:
        "Browse all available diplomas",
    keywords: "diplomas, exams, profile.quiz",
}

export default function Diplomas() {
  return (
    <>
      {/* title header */}
      <TitleHeader
        title="Diplomas"
        icon={<GraduationCap className="w-11 h-11 text-white" />}
      />

      {/* content diplomas */}
      <DiplomasBlocks />
    </>
  );
}
