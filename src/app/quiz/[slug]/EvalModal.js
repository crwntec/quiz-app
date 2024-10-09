"use client";

import { useEffect } from "react";
import Lottie from "react-lottie";
import correctAnimationData from "../../animations/correct.json";

export default function EvalModal({ data, openModal, points }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: correctAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log(correctAnimationData)
  useEffect(() => {
    if (openModal) {
      document.getElementById("modal1").showModal();
    }
  }, [openModal]);

  return (
    <dialog id="modal1" className="modal modal-open">
      <div className="modal-box">
        {points > 0 ? (
          <>
            <Lottie options={defaultOptions} height={400} width={400} />
            <h1 className="text-2xl font-bold text-center">Congratulations!</h1>
            <h2 className="text-xl text-center">
              You passed with
              <b>
                {" "}
                {points}/{data.questions.length}
              </b>{" "}
              points
            </h2>
          </>
        ) : (
          <>
            <Lottie options={defaultOptions} height={400} width={400} />
            <h1 className="text-2xl font-bold text-center">
              Not your day huh? Only {points} points
            </h1>
          </>
        )}
        <div className="modal-action">
          <a href="/" className="btn btn-primary">
            Quit
          </a>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-secondary"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </dialog>
  );
}
