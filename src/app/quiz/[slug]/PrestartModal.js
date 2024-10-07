"use client";

import { useEffect } from "react";

export default function PrestartModal({ data, setReady }) {
    useEffect(() => {
        const modal = document.getElementById("modal1");
        if (modal) {
            modal.showModal();
        }
    }, []); 
    return (
      <dialog id="modal1" className="modal">
        <div className="modal-box">
                <h3 className="font-bold text-lg">{data.title}</h3>
                <p className="pb-4 italic">By {data.author}</p>
          <p className="pb-4">This quiz has {data.questions.length} questions.</p>
          <p className="py-4">Are you sure you want to start the quiz?</p>
          <div className="modal-action">
            <a href="/" className="btn">
              Cancel
            </a>
            <a onClick={() => setReady(true)} className="btn btn-primary">
              Start
            </a>
          </div>
        </div>
      </dialog>
    );
}