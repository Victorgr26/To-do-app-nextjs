import React, { Suspense, lazy } from "react";
import { DarkThemeToggle } from "flowbite-react";

const SignUpForm = lazy(() => import("@/components/signupForm"));

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white">
      <DarkThemeToggle />
      <Suspense fallback={<div>Loading SignUpForm...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default SignUp;
