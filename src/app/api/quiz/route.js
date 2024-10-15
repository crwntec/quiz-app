"use server";
import { PrismaClient } from "@prisma/client";
import { init } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

const createId = init({
  length: 8,
  dictionary: "alphanumeric",
  capitalization: "uppercase",
});

export const createQuiz = async (title, author, questions) => {
  const quizCode = createId();
  await prisma.quiz.create({
    data: {
      code: quizCode,
      title: title,
      author: author,
      questions: {
        create: questions.map((question) => ({
          question: question.question,
          answer: question.answer,
          image: question.image,
          options: question.options,
        })),
      },
    },
  });
  return quizCode;
};

export const getQuiz = async (code) => {
  if (!code) {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true },
    });
    return quizzes;
  }
  const quiz = await prisma.quiz.findUnique({
    where: {
      code: code.toLowerCase(),
    },
    include: {
      questions: true,
    },
  });
  return quiz;
};
