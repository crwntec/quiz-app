import { getQuiz } from "@/app/api/quiz/route";
import PrestartModal from "./PrestartModal";
import QuizClient from "./QuizClient";
export default async function Page({ params }) {
    const data = await getQuiz(params.slug);
    return <div>
        <QuizClient quizData={data} />
    </div>;
}