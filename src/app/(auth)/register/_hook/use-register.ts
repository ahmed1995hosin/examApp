import { useMutation } from "@tanstack/react-query";
import { RegisterFields } from "@/lib/types/auth";
import   RegisterService  from "./../_services/register.service";
import { useRouter } from "next/navigation";

export default function useRegister() {
    // navigation
    const router = useRouter();

    // mutatition 
    const {isPending,error,mutate}=useMutation({
        mutationFn:async(fields:RegisterFields)=>{
            const payload = await RegisterService(fields);
           
            if('code' in payload){
                throw new Error(payload.message);
            }
            return payload;
        },
        onSuccess:(data,variables,context)=>{
            router.push('/login');
        },
    });

    return {isPending,error,register:mutate};
}
