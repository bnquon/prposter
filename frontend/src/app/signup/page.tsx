import { SignupForm } from "@/components/signup-form";
import { Dumbbell } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex w-screen min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dumbbell className="size-4" />
          </div>
          PrPoster
        </a>
        <SignupForm />
      </div>
    </div>
  );
}
