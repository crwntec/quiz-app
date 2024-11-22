"use client";

import { useEffect, useState } from "react";
import QuizDetailModal from "./QuizDetailModal";

export default function QuizList({ quizData }) {
  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selected) {
      setOpenModal(true);
    }
  }, [selected]);

  return (
    <>
      {/* Render the QuizDetailModal only if a quiz is selected */}
      {selected && (
        <QuizDetailModal
          data={selected} // Pass the full quiz object
          openModal={openModal}
          setOpenModal={(isOpen) => {
            setOpenModal(isOpen);
            if (!isOpen) setSelected(null); // Clear selection when modal closes
          }}
        />
      )}
      <h1 className="text-2xl font-bold">All your quizzes</h1>
      <h2 className="text-xl italic mb-4">Select one to view results</h2>
      <ul className="menu bg-base-200 rounded-box w-96">
        {quizData.map((quiz) => (
          <li key={quiz.code}>
            <a onClick={() => setSelected(quiz)}>{quiz.title}</a> {/* Pass the full quiz object */}
          </li>
        ))}
      </ul>
    </>
  );
}
