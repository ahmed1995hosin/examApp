"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ChartPieDonutText from "@/components/shared/timer-duration";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswersFields, AnswersSchema } from "@/lib/schemas/answer.schema";
import useQuestions from "../_hook/use-questions";
import useSubmitQuestion from "../_hook/use-submit-question";
import { useExam } from "./providers/exam-provider";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  RotateCcw,
} from "lucide-react";
import ChartResult from "./chart-result";

export default function ExamQuestions({ examId }: { examId: string }) {
  // useExam context
  const {
    questionsLength,
    currentIndex,
    nextQuestion,
    prevQuestion,
    answersFormated,
    duration,
    showResult,
    setShowResult,
  } = useExam();

  //hook retrive questions
  const { questions, isLoading, time, error } = useQuestions(examId);

  // form
  const form = useForm<AnswersFields>({
    defaultValues: answersFormated,
    resolver: zodResolver(AnswersSchema),
    mode: "onChange",
    shouldUnregister: false,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  // state of current answer
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [hasInitializedForm, setHasInitializedForm] = useState(false);

  // useEffect to initialize form values from answersFormated
  useEffect(() => {
    if (hasInitializedForm || answersFormated.answers.length === 0) return;
    form.reset(answersFormated);
    setHasInitializedForm(true);
  }, [questions, answersFormated]);

  // useEffect if duration changes
  useEffect(() => {
    if (duration <= 0 && questionsLength > 0 && !showResult) {
      toast.error("Time is up! Submitting your answers...");
      const values = form.getValues();
      onSubmitCheck(values);
    }
  }, [duration, questionsLength]);

  useEffect(() => {
    // update current answer when currentIndex  change
    const answer = form.getValues(`answers.${currentIndex}.correct`);
    setCurrentAnswer(answer);
  }, [currentIndex]);

  // handle next question
  const handleNextQuestion = async () => {
    const path = `answers.${currentIndex}.correct` as const;
    const isValid = await form.trigger(path);
    if (!isValid) {
      return;
    }
    nextQuestion();
  };

  // hook submit question
  const { results, isPending, errorCheck, CheckQuestion } = useSubmitQuestion();

  // CheckQuestion
  const onSubmitCheck: SubmitHandler<AnswersFields> = async (values) => {
    CheckQuestion(values, {
      onSuccess: (data) => {
        form.reset();
      },
    });
  };

  return (
    <div className="px-6 py-6 bg-white">
      <div className="px-6">
        {/* Progress */}
        {!isLoading && questionsLength > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1.5">
              <span>Frontend Development - {questions[0]?.exam.title} </span>
              <span>
                Question
                <span className="mx-1.5 text-blue-600 font-bold">
                  {+currentIndex + 1}
                </span>
                of {questionsLength}
              </span>
            </div>
            <Progress value={((+currentIndex + 1) / questionsLength) * 100} />
          </div>
        )}

        {/* Loading */}
        {!showResult && isLoading && (
          <div className="flex items-center justify-center min-h-screen animate-pulse bg-bule-50">
            <h2 className="text-4xl font-bold font-inter text-blue-600">
              <svg
                className="animate-spin h-5 w-5 mr-3 ... text-blue-600 "
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </h2>
          </div>
        )}

        {/* Error */}
        {!showResult && error && (
          <div className="bg-transparent p-6 flex items-center justify-center">
            <p className="text-red-600">Error loading Questions</p>
          </div>
        )}

        {/* Questions */}
        {!showResult && !isLoading && questionsLength > 0 && (
          <div className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitCheck)}>
                <FormField
                  control={form.control}
                  name={`answers.${currentIndex}.correct`}
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      {/* Question */}
                      <FormLabel className="text-2xl font-semibold text-blue-600">
                        {questions[currentIndex].question}
                      </FormLabel>

                      <FormControl>
                        <RadioGroup
                          className="my-4"
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setCurrentAnswer(value);
                          }}
                        >
                          {questions[currentIndex].answers.map((answer) => (
                            <Label
                              key={answer.key}
                              className={`flex items-center space-x-2 p-4 
                                    text-sm transition-all text-gray-800 hover:bg-gray-100 cursor-pointer
                                    ${
                                      currentAnswer === answer.key
                                        ? "bg-gray-100"
                                        : "bg-gray-50"
                                    }
                                    `}
                              htmlFor={answer.key}
                            >
                              <RadioGroupItem
                                value={answer.key}
                                id={answer.key}
                              />
                              <span>{answer.answer}</span>
                            </Label>
                          ))}
                        </RadioGroup>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    disabled={currentIndex === 0 || isPending}
                    onClick={() => {
                      prevQuestion();
                    }}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2.5" />
                    Previous
                  </Button>

                  {/* duration */}
                  <div className="w-16 h-16 flex items-center justify-center">
                    <ChartPieDonutText value={duration} total={time} />
                  </div>

                  {currentIndex < questionsLength - 1 ? (
                    <Button
                      type="button"
                      variant="default"
                      className="flex-1"
                      onClick={() => {
                        handleNextQuestion();
                      }}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2.5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="default"
                      className="flex-1"
                      disabled={isPending}
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* show result */}
        {showResult && results && !isPending && (
          <div
            className="p-4 mb-4 text-sm text-green-700  rounded-lg"
            role="alert"
          >
            <h1 className="text-2xl font-semibold pt-6  text-blue-600">
              Results:
            </h1>

            {/* results */}
            <div className="flex items-center my-4">
              {/* chart */}
              <div className="w-1/4 text-xl font-bold text-blue-600 p-2 flex justify-start ">
                <ChartResult
                  correct={results.correct}
                  incorrect={results.wrong}
                />
              </div>

              {/* question with result */}
              <div className="w-3/4 text-xl  p-1.5 border border-gray-100 overflow-scroll h-[514px]">
                {/* wrong questions */}
                {results.WrongQuestions.length === 0 ? (
                  <p className="text-xl text-emerald-600 font-semibold text-center">
                    No wrong questions!
                  </p>
                ) : (
                  <ul>
                    {results.WrongQuestions.map((question, index) => (
                      <li className="p-2.5" key={index}>
                        {/* question */}
                        <p className="text-xl text-blue-600 font-semibold">
                          {question.Question}
                        </p>

                        {/* answers false */}
                        <div className="mt-2.5 p-4 bg-red-50 text-sm text-gray-800">
                          <RadioGroup className="flex align-center gap-2.5 p-0">
                            <RadioGroupItem
                              className="mt-0.5 text-red-600 border-red-300 data-[state=checked]:border-red-600"
                              value=""
                              checked
                            />
                            <span>{question.inCorrectAnswer}</span>
                          </RadioGroup>
                        </div>

                        {/* answers true */}
                        <div className="mt-2.5 p-4 bg-emerald-50 text-sm text-gray-800">
                          <RadioGroup className="flex align-center gap-2.5 p-0">
                            <RadioGroupItem
                              className="mt-0.5 text-emerald-600 border-emerald-600 data-[state=checked]:border-emerald-600"
                              value=""
                              disabled
                            />
                            <span>{question.correctAnswer}</span>
                          </RadioGroup>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* navigation */}
            <div className="flex items-center justify-between pt-6 gap-4">
              {/* restart */}
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                disabled={errorCheck !== null}
                onClick={() => {
                  window.location.reload();
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2.5" />
                Restart
              </Button>

              {/* explore */}
              <Button
                type="button"
                variant="default"
                className="flex-1"
                disabled={errorCheck !== null}
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                <FolderSearch className="w-4 h-4 mr-2.5" />
                Explore
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
