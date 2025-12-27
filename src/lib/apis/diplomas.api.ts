import  Diploma from "@/lib/types/diploma";

export default async function getDiplomasService(pageParam:number=1 ,limit:number=6){
    const response = await fetch(`/api/diplomas?page=${pageParam}&limit=${limit}`);

    const payload:APIResponse<PaginationResponse<Diploma[]>> = await response.json();

    if('code' in payload){
        throw new Error(payload.message);
    }

    return payload;
}
