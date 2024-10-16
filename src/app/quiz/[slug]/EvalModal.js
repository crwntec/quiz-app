"use client";

import { useEffect } from "react";
import AnimPlayer from "@/app/components/AnimPlayer";

export default function EvalModal({ data, openModal, points }) {
  useEffect(() => {
    if (openModal) {
      document.getElementById("modal1").showModal();
    }
  }, [openModal]);

  return (
    <dialog id="modal1" className="modal modal-open">
      <div className="modal-box">
        {points > 0 ? (
          <div>
            <div className="flex justify-center flex-col h-[200px]">
              <AnimPlayer
                autoplay
                keepLastFrame
                src={
                 "https://lottie.host/4ad01f38-ccdb-4059-a5c2-850dd17b6a12/qJn0G4QSyY.json"
                }
              />
            </div>
            <h1 className="text-2xl font-bold text-center mt-12">Congratulations!</h1>
            <h2 className="text-xl text-center">
              You passed with
              <b>
                {" "}
                {points}/{data.questions.length}
              </b>{" "}
              points
            </h2>
          </div>
        ) : (
          <div>
            <div className="flex justify-center flex-col h-[200px]">
              <AnimPlayer
                autoplay
                keepLastFrame
                src={
                  "https://lottie.host/6c451505-b65d-4f03-8c0e-4f1c50b3d359/ur2kPQj362.json"
                }
              />
            </div>
            <h1 className="text-2xl font-bold text-center mt-12">
              Not your day huh? Only {points} points
            </h1>
          </div>
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
