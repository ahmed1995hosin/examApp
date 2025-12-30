import { useInfiniteQuery } from "@tanstack/react-query";
import getDiplomasService from "@/lib/apis/get-diplomas.api";

export default function useDiplomas() {
    // retrieve diplomas
    const{
        data: diplomas,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        error,
        isLoading}= useInfiniteQuery({
        queryKey: ['diplomas'],
        queryFn: ({pageParam=1})=>getDiplomasService(pageParam as number),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if('code' in lastPage){
                return undefined
            }
            if(lastPage.metadata.currentPage === lastPage.metadata.numberOfPages){
                return undefined
            }
            return lastPage.metadata.currentPage + 1;
        }

    });

    return {
        diplomas,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        error,
        isLoading
    };
}
