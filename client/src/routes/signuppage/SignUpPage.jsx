import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full shadow-[0_0_95px_rgba(139,92,246,0.9)]">
      
      <div className="shadow-[0_0_99px_rgba(139,92,246,0.9)]">
      <SignUp signInUrl="sign-in" forceRedirectUrl={"/dashboard"}/>
      </div>
    </div>
  )
}