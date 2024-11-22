"use server";
import { PrismaClient } from "@prisma/client";
import { init } from "@paralleldrive/cuid2";
import { getUserFromToken } from "../auth/actions";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const createId = init({
  length: 8,
  dictionary: "alphanumeric",
  capitalization: "uppercase",
});

export const createQuiz = async (title, questions) => {
  const quizCode = createId();
  const token = (await cookies()).get("token")?.value;
  const user = await getUserFromToken(token);
  await prisma.quiz.create({
    data: {
      code: quizCode,
      title: title,
      author: {
        connect: {
          id: user.id,
        },
      },
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
    const user = await getUserFromToken((await cookies()).get("token")?.value);
    const quizzes = await prisma.quiz.findMany({
      where: {
        authorid: user.id,
      },
      include: { author: true, questions: true, results: true },
    });
    return quizzes;
  }
  const quiz = await prisma.quiz.findUnique({
    where: {
      code: code.toLowerCase(),
    },
    include: {
      author: true,
      questions: true,
      results: true,
    },
  });
  return quiz;
};

export const getResults = async (quizId) => {
  const results = await prisma.result.findMany({
    where: {
      quizId: quizId,
    },
  });
  return results;
};

export const createResult = async (quizId, name, points) => {
  const result = await prisma.result.create({
    data: {
      name: name,
      points: points,
      quiz: {
        connect: {
          id: quizId,
        },
      },
    },
  });
  return result;
};
