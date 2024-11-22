"use client"; // Mark this as a client-side component

import { useState } from "react";
import PrestartModal from "./PrestartModal";
import EvalModal from "./EvalModal";
import ImageComponent from "@/app/components/ImageComponent";

export default function QuizClient({ quizData, onFinished }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");

  const validateQuestion = (event) => {
    event.preventDefault(); // Prevent form submission
  
    const isAnswerCorrect = answer === quizData.questions[questionIndex].answer;
    const updatedPoints = isAnswerCorrect ? points + 1 : points; // Calculate updated points
  
    if (questionIndex === quizData.questions.length - 1) {
      // Pass the updated points to onFinished when the quiz ends
      onFinished(name, updatedPoints);
      setQuizFinished(true);
    } else {
      setQuestionIndex(questionIndex + 1); // Move to the next question
    }
  
    // Update the points state
    if (isAnswerCorrect) {
      setPoints(updatedPoints);
    }
  
    // Reset the answer input field after validation
    setAnswer("");
  };
  

  return (
    <div>
      {!quizStarted ? (
        <PrestartModal data={quizData} setReady={setQuizStarted} name={name} setName={setName}/>
      ) : quizFinished ? (
        <EvalModal data={quizData} openModal={quizFinished} points={points} name={name}/>
      ) : (
        <form onSubmit={validateQuestion}>
          <div className="flex justify-center">
            <div className="container rounded-lg bg-base-100 p-6 m-4 w-screen">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold mb-1/2">{quizData.title}</h1>
                  <p className="text-md mb-4 italic">By {quizData.author.name}</p>
                </div>
                <p className="text-lg mb-4">
                  Question {questionIndex + 1} of {quizData.questions.length}
                </p>
              </div>
              <div>
                <progress
                  className="progress progress-primary w-full"
                  value={(questionIndex + 1) / quizData.questions.length}
                  max="1"
                ></progress>
                <div className="flex items-center mt-4">
                      {quizData.questions[questionIndex].image != "" && <>
                        { <ImageComponent image={quizData.questions[questionIndex].image} width={200} height={200} />
                        }
                      </>}
                  <div className="ml-4">
                    <p className="text-lg font-bold italic">
                      {quizData.questions[questionIndex].question}
                    </p>
                    {quizData.questions[questionIndex].options.split("|")
                      .length > 1 &&
                    quizData.questions[questionIndex].options !== "" ? (
                      <>
                        {quizData.questions[questionIndex].options
                          .split("|")
                          .map((option, index) => (
                            <label key={index} className="label cursor-pointer">
                              <span className="label-text text-xl">
                                {option}
                              </span>
                              <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={answer === option}
                                onChange={(e) => setAnswer(e.target.value)} // Update selected answer
                                className="radio"
                              />
                            </label>
                          ))}
                      </>
                    ) : (
                      <>
                        <p>{quizData.questions[questionIndex].options}</p>
                        <input
                          className="input input-bordered w-full max-w-xs mt-4"
                          type="text"
                          placeholder="Enter your answer"
                          onChange={(e) => setAnswer(e.target.value)}
                          value={answer}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mt-16">
                <button type="submit" className="btn btn-primary">
                  {questionIndex === quizData.questions.length - 1
                    ? "Finish Quiz"
                    : "Submit Answer"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
