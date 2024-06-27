"use server";

import { db } from "../db";

export const getAllTeachersNameAndID = async () => {
  try {
    const Teachers = await db.teacher.findMany({});
    return Teachers;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};
