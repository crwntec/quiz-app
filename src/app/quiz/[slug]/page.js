import { getQuiz } from "@/app/api/quiz/actions";
import { notFound } from "next/navigation";
import QuizClient from "./QuizClient";
import { createResult } from "@/app/api/quiz/actions";
export default async function Page(props) {
    const params = await props.params;
    const data = await getQuiz(params.slug);

    if (!data) {
        return notFound()
    }

    const addResult = async (name, points) => {
        "use server";
        const quizId = data.id;
        createResult(quizId, name, points);
    }

    return <div>
        <QuizClient quizData={data} onFinished={addResult} />
    </div>;
}