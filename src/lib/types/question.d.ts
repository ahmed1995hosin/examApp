import { Exam } from "./exam.d";
// question
export type Question = {
    _id: string;
    question: string;
    type: "single_choice" | "multiple_choice";
    answers: AnswerOption[];
    subject: string | null;
    correct:string;
    exam: Exam;
}

// answer option
export type AnswerOption = {
    answer: string;
    key: string;
}

// question response
export type CheckQuestionResponse = {
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: {
    QID: string;
    Question: string;
    inCorrectAnswer: string;
    correctAnswer: string;
  }[];

  correctQuestions: {
    QID: string;
    Question: string;
    correctAnswer: string;
  }[];
}