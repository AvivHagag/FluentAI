"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { generateVerficiationToken } from "@/lib/tokens";
import { UserRole } from "@prisma/client";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  roleSelected: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  console.log("start!");

  if (!validatedFields.success) {
    return { error: "שדות לא חוקיים!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "האיימיל הזה כבר בשימוש!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: roleSelected as UserRole,
    },
  });

  const verficationToken = await generateVerficiationToken(email);

  return { success: "המשתמש נוצר בהצלחה!" };
};
