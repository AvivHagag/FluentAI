"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { RecruiterModal } from "./recruiter-modal";
import recruiterIcon from "@/public/recruiterIcon.png";
import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
  const searchParam = useSearchParams();
  const urlError =
    searchParam.get("error") === "OAuthAccountNotLinked"
      ? "אנא התחבר עם האימייל הזה בדרך אחרת"
      : "";
  const recruiterParam = searchParam.get("recruiterRef");
  const modalRecruiterOpen = recruiterParam !== null;
  const [showModal, setShowModal] = useState<boolean>(!!modalRecruiterOpen);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
      });
    });
  };

  const handleSelectAccount = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <>
      {modalRecruiterOpen && (
        <div className="px-2">
          <RecruiterModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSelectAccount={handleSelectAccount}
          />
        </div>
      )}
      <CardWrapper
        headerLabel="ברוך השב"
        headerTitle="התחברות"
        backButtonLabel="אין לך משתמש עדין?"
        backButtonHref="/register"
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
                    <Button
                      size="sm"
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href="/reset">שכחת את הסיסמא?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              התחברות
            </Button>
          </form>
        </Form>
      </CardWrapper>
      {modalRecruiterOpen && !showModal && (
        <Button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 shadow-lg bg-lightBeige hover:bg-mediumBeige text-black gap-2 rounded-full p-3 h-auto transition-all hover:scale-105 border border-lightRed animate-pingSmall"
        >
          <UsersIcon className="w-5 h-5" />
          <span className="font-medium md:text-base">מידע למגייסים</span>
        </Button>
      )}
    </>
  );
};

export default LoginForm;
