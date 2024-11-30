"use client";

import { useEffect } from "react";
import AnimPlayer from "@/app/components/AnimPlayer";

export default function EvalModal({ data, openModal, points, name }) {
  useEffect(() => {
    if (openModal) {
      document.getElementById("modal1").showModal();
    }
  }, [openModal]);

  return (
    <dialog id="modal1" className="modal modal-open">
      <div className="modal-box">
        {points > Math.ceil(data.questions.length * 0.6) ? (
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
            <h1 className="text-2xl font-bold text-center mt-12">Congratulations {name}!</h1>
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
            {points > 0 ? <h1 className="text-2xl font-bold text-center mt-12">
              Not your day huh? Only {points} {points === 1 ? "point" : "points"}
            </h1> : <h1 className="text-2xl font-bold text-center mt-12">You are a failure. 0 Points</h1>}
          </div>
        )}
        <div className="modal-action">
          <a href="/" className="btn btn-primary">
            Ok
          </a>
        </div>
      </div>
    </dialog>
  );
}
