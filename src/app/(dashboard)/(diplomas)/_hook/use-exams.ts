import { useInfiniteQuery } from "@tanstack/react-query";
import getExamsService from "@/lib/apis/get-exams.api";

export default function useExams(subjectId:string) {
   
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        error,
        isLoading,
        }=useInfiniteQuery({
            queryKey: ['exams',subjectId],
            queryFn: ({pageParam})=>getExamsService(pageParam as number,subjectId),
            getNextPageParam: (lastPage) => {
            if('code' in lastPage){
                    return undefined
                }
                if(lastPage.metadata.currentPage === lastPage.metadata.numberOfPages){
                    return undefined
                }
                return lastPage.metadata.currentPage + 1;
            },
            initialPageParam: 1,
            enabled:subjectId?true:false
        });
    return {
        exams: data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        error,
        isLoading,
    };
}
