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
      if (file.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvData = event.target.result;
          const rows = csvData.split("\n");

          // First row: Title and author (split by ";")
          const [title, author] = rows[0].split(";");

          // Second row: Headers (ignoring line-end variations)
          const headers = rows[1].trim();
          if (!headers.startsWith("Question;Options;Image;Answer")) {
            alert("Malformed file: Incorrect headers.");
            return;
          }

          // Initialize questions array
          let questions = [];

          // Loop through the rest of the rows (from index 2 onwards)
          for (let i = 2; i < rows.length; i++) {
            const row = rows[i].trim();
            if (!row) continue; // Skip empty rows

            const fields = row.split(";");

            // Handle malformed rows
            if (fields.length < 4) {
              console.warn(`Malformed row: ${row}`);
              continue;
            }

            const question = fields[0];
            const options = fields[1];
            const image = fields[2];
            const answer = fields[3].replace("\r", "");

            const cleanedOptions = options.replace(/"/g, "")

            // Add the question to the array
            questions.push({
              question: question,
              options: cleanedOptions,
              image: image,
              answer: answer,
            });
          }
          console.log(questions)
          if (questions.length > 0) {
            createQuiz(title, author, questions).then((quizCode) =>
              setCode(quizCode)
            );
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
        <div className="text-5xl font-bold text-green-500 mt-10">{code}</div>
      )}
    </div>
  );
}
