import { Question } from "@/lib/types/question.d";

export default async function getQuestionsByIdService(examId:string){
    
    const response = await fetch(`/api/questions?examId=${examId}`);

    const payload:APIResponse<PaginationResponse<Question[]>> = await response.json();

    if('code' in payload){
        throw new Error(payload.message);
    }
    return payload;
}
    