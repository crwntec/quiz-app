import { getQuiz } from "@/app/api/quiz/route"

export default async function Page() {
    const data = await getQuiz();
    return <div>
        {data.map((quiz) => <div key={quiz.code}>{quiz.title}: {quiz.code} </div>)}
    </div>
}