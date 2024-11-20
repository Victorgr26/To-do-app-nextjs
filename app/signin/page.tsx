import React, { Suspense, lazy } from "react";
import { DarkThemeToggle } from "flowbite-react";

const SignInForm = lazy(() => import("@/components/signinForm"));

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white">
      <DarkThemeToggle />
      <Suspense fallback={<div>Loading SignInForm...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
};

export default SignIn;
