import { z } from "zod";

// answer schema
const AnswerSchema = z.object({
    questionId: z.string(),
    correct: z.string('Please select an option').nonempty('Please select an option'),
});

export type AnswerFields = z.infer<typeof AnswerSchema>;
// answers schema
export const AnswersSchema = z.object({
    answers: z.array(AnswerSchema),
    'time': z.number().min(0),
})

export type AnswersFields = z.infer<typeof AnswersSchema>;
