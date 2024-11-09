"use client";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signUp, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    await signUp(email, password);
  };

  return (
    <div
      className="flex items-center justify-center"
      suppressHydrationWarning={true}
    >
      <form
        className="flex min-w-96 max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 text-center text-2xl">Sign Up</h1>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="name@gmail.com"
            required
            shadow
            autoComplete="email"
            aria-autocomplete="list"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            required
            autoComplete="new-password"
            aria-autocomplete="list"
            shadow
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Repeat password" />
          </div>
          <TextInput
            id="repeat-password"
            type="password"
            required
            autoComplete="new-password"
            aria-autocomplete="list"
            shadow
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="agree" className="flex">
            I have an account.&nbsp;
            <Link
              href="/signin"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign In
            </Link>
          </Label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Register new account</Button>
      </form>
    </div>
  );
}
