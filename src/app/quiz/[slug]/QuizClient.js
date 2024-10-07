"use client"; // Mark this as a client-side component

import { useState } from "react";
import PrestartModal from "./PrestartModal";

export default function QuizClient({ quizData }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [points, setPoints] = useState(0);

  const [answer, setAnswer] = useState("");

  const validateQuestion = () => {
    if (answer === quizData.questions[questionIndex].answer) {
      setPoints(points + 1);
    }
    console.log(points)

    if (questionIndex === quizData.questions.length - 1) {
      setQuizStarted(false);
      console.log(points)
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  return (
    <div>
      {!quizStarted ? (
        <PrestartModal data={quizData} setReady={setQuizStarted} />
      ) : (
        <div className="flex justify-center">
          <div className="container rounded-lg bg-base-100 p-6 m-4 w-screen">
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="text-xl font-bold mb-1/2">{quizData.title}</h1>
                <p className="text-md mb-4 italic">By {quizData.author}</p>
              </div>
              <p className="text-lg mb-4">
                Question {questionIndex + 1} of {quizData.questions.length}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold italic">
                {quizData.questions[questionIndex].question}
              </p>
              <input
                className="input input-bordered w-full max-w-xs mt-4"
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => setAnswer(e.target.value)}
                  value={answer}
              />
            </div>
            <div className="flex justify-end items-center mt-16">
              {/* <button
                onClick={() => setQuestionIndex(questionIndex + 1)}
                className="btn btn-ghost"
              >
                Previous
              </button> */}
              <button
                onClick={() => validateQuestion()}
                className="btn btn-primary"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
