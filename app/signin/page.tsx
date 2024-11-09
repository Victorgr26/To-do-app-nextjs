"use client";
import React from "react";
import { SignInForm } from "@/components/signinForm";
import { DarkThemeToggle } from "flowbite-react";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white">
      <DarkThemeToggle />
      <SignInForm />
    </div>
  );
};

export default SignIn;
