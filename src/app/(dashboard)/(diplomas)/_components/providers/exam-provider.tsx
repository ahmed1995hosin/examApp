"use client";

import { AnswersFields } from "@/lib/schemas/answer.schema";
import { createContext, useContext, useState, useEffect } from "react";
import { set } from "zod";

// Exam context provider type
type ExamContextType = {
  questionsLength: number;
  setQuestionsLength: (questionsLength: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;

  // answer fields
  answersFormated: AnswersFields;
  setAnswersFormated: (answers: AnswersFields) => void;

  // handle navigation
  nextQuestion: () => void;
  prevQuestion: () => void;

  // show result
  showResult: boolean;
  setShowResult: (showResult: boolean) => void;
};

const ExamContext = createContext<ExamContextType>({
  questionsLength: 0,
  setQuestionsLength: () => {},
  duration: 0,
  setDuration: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
  answersFormated: {
    answers: [],
    time: 0,
  },
  setAnswersFormated: () => {},
  nextQuestion: () => {},
  prevQuestion: () => {},
  showResult: false,
  setShowResult: () => {},
});

export function ExamProvider({ children }: { children: React.ReactNode }) {
  // state
  const [questionsLength, setQuestionsLength] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersFormated, setAnswersFormated] = useState<AnswersFields>({
    answers: [],
    time: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const nextQuestion = () => {
    if (currentIndex >= questionsLength - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const prevQuestion = () => {
    if (currentIndex === 0) return;

    if (showResult) setShowResult(false);

    setCurrentIndex((prev) => prev - 1);
  };

  // timer function
  useEffect(() => {
    if (duration <= 0 && questionsLength > 0) {
      return;
    }

    const timerInterval = setInterval(() => {
      setDuration((prev) => {
        if (prev <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [duration]);

  return (
    <ExamContext.Provider
      value={{
        questionsLength,
        setQuestionsLength,
        duration,
        setDuration,
        currentIndex,
        setCurrentIndex,
        answersFormated,
        setAnswersFormated,
        nextQuestion,
        prevQuestion,
        showResult,
        setShowResult,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error("useExam must be used within a <ExamProvider />");
  }
  return context;
}
