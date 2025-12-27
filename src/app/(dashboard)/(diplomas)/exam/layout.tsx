import { ExamProvider } from "./../_components/providers/exam-provider"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ExamProvider>
            {children}
        </ExamProvider>
    )
}