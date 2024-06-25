"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { getAllTeachersNameAndID } from "@/lib/ServerActions/ServerActions";
import { User } from "@prisma/client";
import SyncLoader from "react-spinners/SyncLoader";
import { register } from "@/actions/register";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<User[] | undefined>([]);
  const [roleSelected, setRoleSelected] = useState<string>("TEACHER");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    if (roleSelected === "STUDENT") {
      setIsLoading(true);
      getAllTeachersNameAndID()
        .then((teachersData) => {
          console.log(teachersData);
          setTeachers(teachersData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setTeachers([]);
    }
  }, [roleSelected]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values, roleSelected).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="צור משתמש"
      backButtonLabel="יש לך כבר משתמש?"
      backButtonHref="/auth/login"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4" dir="rtl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>אימייל</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>סיסמא</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="שם פרטי ושם משפחה"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>תפקיד</FormLabel>
                  <FormControl>
                    <RadioGroup {...field} dir="rtl">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="TEACHER"
                          value="TEACHER"
                          onChange={() => setRoleSelected("TEACHER")}
                          checked={roleSelected === "TEACHER"}
                        />
                        <Label htmlFor="TEACHER" className="mx-1">
                          מורה
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="STUDENT"
                          value="STUDENT"
                          onChange={() => setRoleSelected("STUDENT")}
                          checked={roleSelected === "STUDENT"}
                        />
                        <Label htmlFor="STUDENT" className="mx-1">
                          תלמיד
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {roleSelected === "STUDENT" && (
              <>
                {isLoading && !teachers ? (
                  <div className="flex items-center justify-center pb-2 space-x-2">
                    <p className="text-naivyBlue dark:text-glowGreen text-xxs">
                      טוען ..
                    </p>
                    <SyncLoader
                      color="#FFFFFF dark:#9ffd32"
                      className="text-naivyBlue dark:text-glowGreen"
                      size={20}
                    />
                  </div>
                ) : (
                  <div>
                    <Label>TODO !!! Additional Info for Students</Label>
                  </div>
                )}
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            צור משתמש
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
