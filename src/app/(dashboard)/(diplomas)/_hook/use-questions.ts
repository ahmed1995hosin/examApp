import { useQuery } from "@tanstack/react-query";
import getQuestionsByIdService from "@/lib/apis/get-questions.api";
import { useExam } from "./../_components/providers/exam-provider";
import { useEffect } from "react";


export default function useQuestions(examId:string){ 
    // query
    const {data,isLoading,error} =useQuery({
        queryKey: ['questions',examId],
        queryFn: () => getQuestionsByIdService(examId),
        enabled: !!examId
    });
    // use provider question
    const { setQuestionsLength, setDuration, setAnswersFormated} = useExam();

    // use effect
    useEffect(() => {
        if (data?.questions?.length != null) {
            setQuestionsLength(data.questions.length);

            // initialize answers
            const initializeAnswers = data.questions.map((question) => ({ 
                questionId: question._id,
                correct: ''
            }));
            
            setAnswersFormated({
                answers: initializeAnswers,
                time: 0,
            });
        }
    
        if (data?.questions?.[0]?.exam?.duration != null) {
        setDuration(data.questions[0].exam.duration*60); // convert minutes to seconds
        }
    }, [data]);

  return {
    questions: data?.questions || [],
    time: data?.questions?.[0]?.exam?.duration*60 || 0,
    isLoading,
    error
  };
}  
    