"use client";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex min-w-96 max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3 text-center text-2xl">Sign In</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@gmail.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2"></div>
        <div>
          <Label htmlFor="agree" className="flex">
            No account ?&nbsp;
            <Link
              href="/signup"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign Up for free
            </Link>
          </Label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
