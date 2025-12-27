"use server";

import { getToken } from "@/lib/utils/mange-token";
import { CheckQuestionResponse } from "@/lib/types/question.d";
import { AnswersFields } from "@/lib/schemas/answer.schema"

export async function submitQuestionService(data:AnswersFields){
    // get token
    const token =await getToken();
    if(!token){
        return {message:'Unauthorized',code:401};
    }

    // submit question
    const response = await fetch(`${process.env.API_URL}/questions/check`,{
        method:'POST',
        headers: {
            'token': token.token,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    });
    const payload :APIResponse<CheckQuestionResponse> = await response.json();
    return payload;
}