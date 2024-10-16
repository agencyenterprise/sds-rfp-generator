import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignUp forceRedirectUrl="/api/auth/connect" />
    </main>
  );
}
