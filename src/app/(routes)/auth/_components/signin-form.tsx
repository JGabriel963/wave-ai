"use client";
import { z } from "zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { RiLoader2Line } from "@remixicon/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Field, FieldLabel } from "@/components/ui/field";
import { useAuthToken } from "@/hooks/use-auth-token";

const signInSchema = z.object({
  email: z.email("Invalid email").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const { setBearerToken } = useAuthToken();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          const token = ctx.response.headers.get("set-auth-token");
          if (token) {
            setBearerToken(token);
          }
          router.replace("/home");
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-transparent! border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Wave account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Field>
              <Controller
                control={form.control}
                name="email"
                render={({ field }) => (
                  <>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      placeholder="johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </>
                )}
              />
            </Field>

            <Field>
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FieldLabel>Password</FieldLabel>
                    <Input placeholder="*****" type="password" {...field} />
                  </>
                )}
              />
            </Field>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-white"
            >
              {isLoading && <RiLoader2Line className="w-4 h-4 animate-spin" />}
              Sign In
            </Button>
            <div className="text-center text-sm">
              Dont have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInForm;
