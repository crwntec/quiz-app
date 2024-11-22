"use client";

import { useEffect } from "react";

export default function PrestartModal({ data, setReady, name, setName }) {
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
        <p className="pb-4 italic">By {data.author && data.author.name}</p>
        <p className="pb-4">This quiz has {data.questions.length} questions.</p>
        <input
          type="text"
          placeholder="Enter your name to continue"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setName(e.target.value)}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setReady(true);
          }}
        >
          <div className="modal-action">
            <a href="/" className="btn">
              Cancel
            </a>
            <button
              type="submit"
              className={`${
                name && name.trim().length > 2
                  ? "btn btn-primary"
                  : "btn btn-disabled"
              }`}
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
