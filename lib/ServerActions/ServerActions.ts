"use server";
import { TeacherNotApprovedRoute } from "@/routes";
import { db } from "../db";
import { auth } from "@/auth";
import { Select } from "@tremor/react";

export const getAllTeachersNameAndID = async () => {
  try {
    const Teachers = await db.teacher.findMany({});
    return Teachers;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const NumberOfTeachersWaitingApproval = async () => {
  try {
    const number = await db.user.findMany({
      where: { role: "TEACHERNOTAPPROVED" },
    });
    return number.length;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const getTeachersWaitingApproval = async () => {
  try {
    const Teachers = await db.user.findMany({
      where: { role: "TEACHERNOTAPPROVED" },
      select: { id: true, name: true },
    });
    return Teachers;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const ApproveTeacher = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { role: "TEACHER" },
    });
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const getAllUsers = async () => {
  try {
    const Users = await db.user.findMany({
      where: {
        role: {
          in: ["STUDENT", "TEACHER"],
        },
      },
    });
    return Users;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const DeleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const studentSelfLearningAnswer = async (
  type: string,
  text: string,
  correctAnswer: string,
  correct: boolean
) => {
  try {
    const session = await auth();
    if (session) {
      const question = await db.question.create({
        data: {
          type,
          text,
          correctAnswer,
        },
      });
      const studentAnswer = await db.studentAnswer.create({
        data: {
          student: {
            connect: {
              userId: session.user.id,
            },
          },
          question: {
            connect: {
              id: question.id,
            },
          },
          givenAnswer: correctAnswer,
          isCorrect: correct,
        },
      });
    }
  } catch (error) {
    console.error("Error Saving Answer - ", error);
  }
};

export const studentStats = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  try {
    const studentAnswers = await db.studentAnswer.findMany({
      where: {
        student: {
          userId: userId,
        },
      },
      include: {
        question: {
          select: {
            type: true,
          },
        },
      },
    });
    return studentAnswers;
  } catch (error) {
    console.error("Error retrieving student answers:", error);
    throw error;
  }
};
