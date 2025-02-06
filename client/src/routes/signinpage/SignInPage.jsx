import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex  justify-center items-center h-full">
     

      {/* Wrapping SignIn in a div to apply shadow */}
      <div className="shadow-[0_0_99px_rgba(139,92,246,0.9)]">
        <SignIn signUpUrl="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}
