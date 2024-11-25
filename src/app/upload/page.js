"use client";
import { useState } from "react";
import { createQuiz } from "../api/quiz/actions.js";

export default function Page() {
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);
  const [code, setCode] = useState("");

  const processFile = (file) => {
    if (file.name.endsWith(".csv")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split("\n");

        // Extract title and author
        const [title, author] = rows[0].split(";");
        if (!title) {
          alert("Malformed file: Missing title.");
          return;
        }

        // Check headers
        const headers = rows[1].trim();
        if (!headers.startsWith("Question;Options;Image;Answer")) {
          alert("Malformed file: Incorrect headers.");
          return;
        }

        // Extract questions
        const questions = rows.slice(2).reduce((acc, row) => {
          const fields = row.split(";");
          if (fields.length >= 4) {
            acc.push({
              question: fields[0],
              options: fields[1].replace(/"/g, ""), // Clean quotes
              image: fields[2],
              answer: fields[3].replace("\r", ""), // Remove line endings
            });
          }
          return acc;
        }, []);

        if (questions.length > 0) {
          // Create the quiz and fetch the generated code
          createQuiz(title, questions).then((quizCode) => {
            setCode(quizCode);
            setFileSuccess(true);
          });
        } else {
          alert("No valid questions found in the file.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .csv file.");
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
              processFile(file);
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
            processFile(file);
          }}
        />
        {fileEnter && <div className="text-sky-500">Drop file here</div>}
      </div>
      {fileSuccess && (
        <div className="text-5xl font-bold text-green-500 mt-10">{code}</div>
      )}
    </div>
  );
}
