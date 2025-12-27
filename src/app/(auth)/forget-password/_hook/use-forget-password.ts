import { useMutation } from "@tanstack/react-query";
import { ForgetPasswordField } from "@/lib/types/auth";
import ForgetPasswordService from "../_services/forget-password.service";
import { useForget } from "../_components/providers/forget-provider";
import { toast } from "sonner";

export default  function useForgetPassword() {
    // use forgetProvider
    const {setEmail,startTimer}=useForget();
    
    // mutation
    const{isPending,error,mutate}=useMutation({
        mutationFn : async(field:ForgetPasswordField)=>{

            const respone= await ForgetPasswordService(field);
            if('code' in respone){
                throw new Error(respone.message);
            }
            return respone; 
        },
        onSuccess:(data,variables,context)=>{
            // set email
            setEmail(variables.email);
            // start timer
            startTimer();
            // toast
            toast.success(`${data.info ?? 'OTP sent successfully'}, check your inbox`);
        }
     }
    );

    return {isPending,error,forgetPassword:mutate};
}
