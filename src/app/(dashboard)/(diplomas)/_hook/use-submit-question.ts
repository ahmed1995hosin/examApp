import { AnswersFields } from "@/lib/schemas/answer.schema";
import { useMutation } from "@tanstack/react-query";
import { submitQuestionService } from "../_services/submit-question.service";
import { useExam } from "../_components/providers/exam-provider";
import { toast } from "sonner";

export default function useSubmitQuestion(){
    // useExam context
    const {duration ,setShowResult,setCurrentIndex,questionsLength} = useExam();

    // mutation
    const{data:results,isPending,error,mutate}=useMutation({
        mutationFn:async(fields:AnswersFields)=>{

            const payload = await submitQuestionService({...fields,time:duration});
            if('code' in payload){
                throw new Error(payload.message);
            }
            return payload;
        },
        onSuccess:(data)=>{
            toast.success('Question submitted successfully');
            setShowResult(true);
            setCurrentIndex(questionsLength - 1);
        },

        onError:(varibles)=>{
            console.log('error submitting question',varibles,error);
            toast.error('Something went wrong, please try again later');
            new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
                window.location.reload();
            });
        },

    });

    return {results,isPending,errorCheck:error,CheckQuestion:mutate};
}
