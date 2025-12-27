"use client";

import {SubmitHandler, useForm } from "react-hook-form";
import { LoginFields } from "@/lib/types/auth";
import { Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/auth.schema";
import useLogin from "../_hook/use-login";
import { Input } from "@/components/ui/input";
import {PasswordInput} from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubmitError from "@/components/shared/submit-error";

export default function LoginForm(){
    // form
    const form = useForm<LoginFields>({
        defaultValues: {
            email: "",
            password: "",
        },
        reValidateMode: "onChange",
        resolver: zodResolver(loginSchema),
    });

    // mutation login
    const{isPending,error,login}=useLogin();

    // submit handler
    const onSubmit:SubmitHandler<LoginFields>=async(data)=>{
         login(data,
          {
            // on error
            onError(error){
                console.log(error);
            }
          }
         );
    }

    return (
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* email  */}
                <FormField 
                  name="email" 
                  control={form.control} 
                  render={({ field }) => (
                    <FormItem className="mt-4">

                        {/* label */}
                        <FormLabel  >Email</FormLabel>

                        {/* input */}
                        <Input placeholder="user@example.com" {...field} error={Boolean(form.formState.errors.email)} />

                      {/* message */}
                      <FormMessage />
                    </FormItem>
                  )}
                  />

                {/* password */}
                <FormField 
                  name="password" 
                  control={form.control} 
                  render={({ field }) => (
                    <FormItem className="my-4">
                        <FormLabel className="text-gray-800">Password</FormLabel>

                        {/* input password */}
                        <PasswordInput {...field} error={Boolean(form.formState.errors.password)} placeholder="**********"/>
                        
                        {/* message  */}
                         <FormMessage />

                        {/* forgot password linlink */}
                        <p className=" text-right text-blue-600 text-sm mt-2.5"><Link href="/forget-password">Forgot your password?</Link></p>
                    </FormItem>
                  )}
                  />
                
                {/* submit error */}
                 {error && <SubmitError message={error?.message||'Something went wrong'}/>}

                {/* Button submit */}
                <Button type="submit" className="my-6 w-full" disabled={isPending||(!form.formState.isValid && form.formState.isSubmitted)}>Login</Button>
            </form>
        </Form>
    );
}
