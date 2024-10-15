import { getQuiz } from "@/app/api/quiz/route";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";
export default async function Page({ params }) {
    const data = await getQuiz(params.slug);

    if (!data) {
        return notFound()
    }
    return <div>
        <QuizClient quizData={data} />
    </div>;
}