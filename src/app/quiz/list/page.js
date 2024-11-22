import { getQuiz } from "@/app/api/quiz/actions"
import QuizList from "./QuizList";

export default async function Page() {
    const data = await getQuiz();
    return <>
        <QuizList quizData={data} />
    </>
}