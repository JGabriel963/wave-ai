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

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 char"),
  email: z.email("Invalid email").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
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
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>Create a Wave.ai account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Field>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <>
                    <FieldLabel>Name</FieldLabel>
                    <Input placeholder="John Doe" {...field} />
                  </>
                )}
              />
            </Field>

            <Field>
              <Controller
                name="email"
                control={form.control}
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
                name="password"
                control={form.control}
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
              Sign Up
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
