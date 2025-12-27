import { 
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/shared/password-input";
import  SubmitError from "@/components/shared/submit-error";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/auth.schema";
import useRegister from "../_hook/use-register";

export default function RegisterForm() {
    // form
    const form = useForm<RegisterFields>({
            defaultValues: {
                username: '',
                firstName: '',
                lastName: '',       
                email: '',
                password: '',
                rePassword: '',
                phone: '',
            },
            reValidateMode: "onChange",
            resolver: zodResolver(registerSchema),
        });
    
    // mutation Register
    const{isPending,error,register}=useRegister();

    // format phone
    const formatPhone = (value:string) => {
         let digits = value.replace(/[^0-9]/g, "");

         if (digits.startsWith("20")) {
          digits = "0" + digits.slice(2);
         }

         return digits;
    };
    
    // submit handler
    const onSubmit:SubmitHandler<RegisterFields>=async(data)=>{
        register({
            ...data,
            phone: formatPhone(data.phone),
        },
            {
                // on error
                onError(error){
                    console.log(error);
                }
            }
        );
    };

    return (
        <Form {...form}>  
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4"> 

                <div className="flex gap-2.5 mb-4 ">
                   {/* first name */}
                        <FormField 
                        control={form.control} 
                        name="firstName" 
                        render={({field})=>(
                            <FormItem className="w-1/2">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ahmed" {...field} error={Boolean(form.formState.errors.firstName)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        /> 

                    {/* last name */}
                        <FormField 
                        control={form.control} 
                        name="lastName" 
                        render={({field})=>(
                            <FormItem className="w-1/2">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Abdullah" {...field} error={Boolean(form.formState.errors.lastName)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                  )}
                   />
                </div>

                {/* username */}
                <FormField 
                        control={form.control}
                        name="username" 
                        render={({field})=>(
                            <FormItem  className="mb-4">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="user123" {...field} error={Boolean(form.formState.errors.username)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />  
                
                {/* email */}
                <FormField 
                        control={form.control}
                        name="email" 
                        render={({field})=>(
                            <FormItem  className="mb-4">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="user@example.com" {...field} error={Boolean(form.formState.errors.email)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                
                {/* phone */}
                <FormField 
                        control={form.control}
                        name="phone" 
                        render={({field})=>(
                            <FormItem  className="mb-4">
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput placeholder="1012345678" {...field} error={Boolean(form.formState.errors.phone)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                
                {/* password */}
                <FormField 
                        control={form.control}
                        name="password" 
                        render={({field})=>(
                            <FormItem  className="mb-4">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="*******" {...field} error={Boolean(form.formState.errors.password)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
               
                {/* re-password */}
                <FormField 
                        control={form.control}
                        name="rePassword" 
                        render={({field})=>(
                            <FormItem  className="mb-4">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <PasswordInput placeholder="*******" {...field} error={Boolean(form.formState.errors.rePassword)}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                {/* submit error */}
                {error && <SubmitError message={error.message ||"Something went wrong"} />}
            
                {/* Button submit */}
                <Button type="submit" className="my-6 w-full" disabled={isPending ||(!form.formState.isValid && form.formState.isSubmitted)}>Create Account</Button>
            </form>

        </Form>
    );
}