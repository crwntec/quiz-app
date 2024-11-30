"use client";
import { useState } from "react";
import { createQuiz } from "../api/quiz/actions.js";

export default function Page() {
  const [file, setFile] = useState(null);
  const [fileEnter, setFileEnter] = useState(false);
  const [fileSuccess, setFileSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");

  const processFile = (file) => {
    if (!file.name.endsWith(".csv")) {
      setErrorMessage("Invalid file format. Please upload a .csv file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n");

      // Extract title and author
      const [title, author] = rows[0].split(";");
      if (!title) {
        setErrorMessage("Malformed file: Missing title in the first line.");
        return;
      }

      // Check headers
      const headers = rows[1]?.trim();
      if (!headers?.startsWith("Question;Options;Image;Answer")) {
        setErrorMessage("Malformed file: Incorrect headers. Ensure headers are 'Question;Options;Image;Answer'.");
        return;
      }

      // Extract questions
      const questions = rows.slice(2).reduce((acc, row) => {
        const fields = row.split(";");
        if (fields.length >= 4) {
          acc.push({
            question: fields[0],
            options: fields[1].replace(/"/g, ""), // Split options by '|'
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
          setErrorMessage("");
        });
      } else {
        setErrorMessage("No valid questions found in the file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Create Your Quiz</h1>

      <div className="mb-6 text-lg text-white-600">
        <p>
          Upload a <span className="font-bold text-blue-600">.csv file</span> with the following format:
        </p>
        <ul className="list-disc list-inside mt-4 text-sm">
          <li>
            <strong>First line:</strong> Quiz title (e.g., "Quiz Title;").
          </li>
          <li>
            <strong>Second line:</strong> Headers: <code>Question;Options;Image;Answer</code>.
          </li>
          <li>
            <strong>Subsequent lines:</strong> Questions and answers:
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>
                <strong>Question:</strong> The question text.
              </li>
              <li>
                <strong>Options:</strong> Choices separated by <code>|</code> (This is optional leave blank if not needed).
              </li>
              <li>
                <strong>Image:</strong> Optional image URL (This is optional leave blank if not needed).
              </li>
              <li>
                <strong>Answer:</strong> Correct answer text.
              </li>
            </ul>
          </li>
        </ul>
        <p className="mt-4 text-gray-500">Example:</p>
        <pre className="bg-gray-800 text-white p-4 rounded text-sm">
          {`Quiz Title;\nQuestion;Options;Image;Answer\nWhat is 2+2?;"4|3|5";;4\nIs gambling dangerous;;https://pbs.twimg.com/media/GQ2M9PWWMAA-jUg.jpg;No`}
        </pre>
      </div>

      <div
        className={`
          border-dotted 
          border-4 
          rounded-md 
          h-64 
          flex 
          flex-col 
          justify-center 
          items-center 
          transition 
          ${
            fileEnter 
              ? "border-blue-500 bg-gray-100 dark:bg-gray-800 dark:border-blue-300" 
              : "border-accent-content dark:border-info"
          }
        `}
        
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
          className="text-center cursor-pointer text-blue-600"
        >
          Drag & Drop or Click to Upload Your File
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            setFile(file);
            processFile(file);
          }}
        />
        {fileEnter && (
          <div className="text-blue-500 mt-2">Drop your file here</div>
        )}
      </div>

      {errorMessage && (
        <div className="mt-6 text-red-500 font-semibold">{errorMessage}</div>
      )}

      {fileSuccess && (
        <div className="mt-8 text-green-600 font-bold text-2xl">
          Success! Your quiz code is: <span>{code.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}
