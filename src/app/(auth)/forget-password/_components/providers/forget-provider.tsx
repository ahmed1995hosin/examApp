"use client";

import { createContext, useContext, useState, useEffect } from "react";

type StepType=1|2|3;
type ForgetContextType = {
    email: string;
    setEmail: (email: string) => void;
    step:StepType ;
    setStep: (step: StepType) => void;
    nextStep: () => void;
    prevStep: () => void;
    startTimer: () => void;
    time: number;
};

const ForgetContext = createContext<ForgetContextType>(
    {
        email: "",
        setEmail: () => {},
        step: 1,
        setStep: () => {},
        nextStep: () => {},
        prevStep: () => {},
        startTimer: () => () => {},
        time: 60,
    }
);

// provider component ForgetProvider
export function ForgetProvider({ children }: { children: React.ReactNode }) {
    // state
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<StepType>(1);

    // timer
    const [time, setTime] = useState(60);
    const [ToggleRunning, setToggleRunning] = useState(false); 

    // function
    const nextStep = () => {
        setStep((prev) => (prev < 3 ? prev + 1 : prev) as StepType);
    };
    const prevStep = () => {
        setStep((prev) => (prev > 1 ? prev - 1 : prev) as StepType);
    };

   const startTimer = () => {
    setTime(60);
    setToggleRunning(ToggleRunning ? false : true);
   };

   useEffect(() => {

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    }, [ToggleRunning]);
   
    return (
        <ForgetContext.Provider
            value={{ email, setEmail, step, setStep, nextStep, prevStep, startTimer, time }}>
            {children}
        </ForgetContext.Provider>
    );
}

// hook useForget
export function useForget() {
    const context = useContext(ForgetContext);

    if (!context) {
        throw new Error("useForget must be used within a <ForgetProvider />");
    }
    return context;
}
