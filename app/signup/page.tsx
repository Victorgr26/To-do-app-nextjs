"use client";
import React from "react";
import { SignUpForm } from "@/components/signupForm";
import { DarkThemeToggle } from "flowbite-react";

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white">
      <DarkThemeToggle />
      <SignUpForm />
    </div>
  );
};

export default SignUp;
