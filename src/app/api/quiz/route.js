"use server";
import { PrismaClient } from "@prisma/client";
import { init } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

const createId = init({
  length: 8,
  dictionary: "alphanumeric",
  capitalization: "uppercase",
});

export const createQuiz = async (questions) => {
  const quizCode = createId();
  await prisma.quiz.create({
    data: {
      code: quizCode,
      author: "Anonymous",
      questions: {
        create: questions.map((question) => ({
          question: question.question,
          answer: question.answer,
        }))
      },
    },
  });
  return quizCode;
};

export const getQuiz = async (code) => {
  const quiz = await prisma.quiz.findUnique({
    where: {
      code: code,
    },
    include: {
      questions: true,
    },
  });
  return quiz;
};
