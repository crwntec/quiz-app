"use client";
import { useState } from "react";
import { createQuiz } from "../api/quiz/route.js";

export default function Page() {
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);
  const [code, setCode] = useState("");

  const processFile = () => {
    if (file) {
      console.log(file);
      if (file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvData = event.target.result;
          const rows = csvData.split("\n");
          const data = rows.map((row) => {
            return row.split(",");
          });
          const headers = data[0];
          if (headers[0] !== "Question;Answer\r") {
            alert("malformed file");
            return;
          }
          let questions = [];
          for (let i = 1; i < data.length - 1; i++) {
            const question = data[i][0].split(";")[0];
            const answer = data[i][0].split(";")[1];
            questions.push({
              question: question,
              answer: answer.replace("\r", ""),
            });
          }
          if (questions.length > 0) {
            createQuiz(questions).then(quizCode=>setCode(quizCode));
            setFileSuccess(true);
          }
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a .csv file");
      }
    }
  };
  return (
    <div>
      <div className="text-5xl font-bold mb-20">Upload your own quiz</div>
      <div
        className="container px-4 max-w-5xl mx-auto border-dotted border-4 border-sky-500 rounded-md h-96 flex flex-col justify-center items-center"
        onDragOver={(e) => {
          e.preventDefault();
          setFileEnter(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setFileEnter(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setFileEnter(false);
          if (e.dataTransfer.items) {
            const item = e.dataTransfer.items[0];
            if (item.kind === "file") {
              const file = item.getAsFile();
              setFile(file);
              processFile();
            }
          }
        }}
      >
        <label
          htmlFor="file"
          className="h-full flex flex-col justify-center text-center"
        >
          Click to upload or drag and drop
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files[0]);
            processFile();
          }}
        />
        {fileEnter && <div className="text-sky-500">Drop file here</div>}
      </div>
      {fileSuccess && (
        <div className="text-5xl font-bold text-green-500 mt-10">
          {code}
        </div>
      )}
    </div>
  );
}
