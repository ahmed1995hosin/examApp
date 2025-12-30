
import Exam from "@/lib/types/exam";
export default async function getExamsService(pageParam:number,subjectId:string){

    const response = await fetch(`/api/exams?subjectId=${subjectId}&page=${pageParam}&limit=6`);

    const payload:APIResponse<PaginationResponse<Exam[]>> = await response.json();

    if('code' in payload){
        throw new Error(payload.message);
    }
    return payload; 
}
