import { getQuiz } from "@/app/api/quiz/route";
export default async function Page({ params }) {
    const data = await getQuiz(params.slug);
    return <div>
        {
            data.author
        }
    </div>;
}