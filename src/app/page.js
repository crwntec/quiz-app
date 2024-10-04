"use client";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");


  return (
    <div className="">
      <div className="text-center text-5xl font-bold mb-20">Quiz App</div>
      <div className="flex justify-center">
        <input
          type="text"
          autoCapitalize="on"
          placeholder="Enter quiz code"
          className="input input-bordered w-full max-w-xs mr-1"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          value={code}
        />
        <button onClick={() => {
          if (code.length > 7) {
            window.location.href = "/quiz/" + code
          }
        }} className={"btn " + (code.length > 7 ? "btn-primary" : "btn-disabled")} >Start Quiz</button>
      </div>
      <div className="text-center italic text-sm mt-10">
        The Quiz Code is shared by your teacher
      </div>
    </div>
  );
}
