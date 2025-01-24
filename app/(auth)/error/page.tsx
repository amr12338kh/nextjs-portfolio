"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

enum AuthError {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
  OAuthSignin = "OAuthSignin",
  OAuthCallback = "OAuthCallback",
  EmailSignin = "EmailSignin",
  CredentialsSignin = "CredentialsSignin",
  SessionRequired = "SessionRequired",
}

const errorMap: Record<
  AuthError,
  { title: string; message: string; action: string }
> = {
  [AuthError.Configuration]: {
    title: "Configuration Error",
    message: "There was a problem with the authentication configuration.",
    action: "Contact administrator",
  },
  [AuthError.AccessDenied]: {
    title: "Access Denied",
    message: "You don't have permission to sign in.",
    action: "Try different account",
  },
  [AuthError.Verification]: {
    title: "Verification Error",
    message: "The verification token has expired or is invalid.",
    action: "Try again",
  },
  [AuthError.OAuthSignin]: {
    title: "OAuth Sign In Error",
    message: "Error in constructing an authorization URL.",
    action: "Try again",
  },
  [AuthError.OAuthCallback]: {
    title: "OAuth Callback Error",
    message: "Error in handling the callback from the authorization server.",
    action: "Try again",
  },
  [AuthError.Default]: {
    title: "Authentication Error",
    message: "An unexpected error occurred during authentication.",
    action: "Try again",
  },
  [AuthError.EmailSignin]: {
    title: "Email Sign In Error",
    message: "There was an error signing in with email.",
    action: "Try again",
  },
  [AuthError.CredentialsSignin]: {
    title: "Credentials Sign In Error",
    message: "There was an error signing in with credentials.",
    action: "Check your credentials",
  },
  [AuthError.SessionRequired]: {
    title: "Session Required",
    message: "A session is required to access this resource.",
    action: "Sign in to continue",
  },
};

function AuthErrorContent() {
  const router = useRouter();
  const search = useSearchParams();
  const error = (search.get("error") as AuthError) || AuthError.Default;
  const errorDetails = errorMap[error] || errorMap[AuthError.Default];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="">
        <div className="mb-6 text-center">
          <svg
            className="mx-auto h-12 w-12 sm:h-[60px] sm:w-[60px] text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mb-4 text-xl sm:text-3xl font-bold text-primary">
            {errorDetails.title}
          </h2>
          <p className="mt-2 text-muted-foreground text-center text-sm sm:text-base max-w-[300px] sm:max-w-[500px]">
            {errorDetails.message}
          </p>
          <code className="mt-2 block rounded-sm bg-muted p-2 text-xs sm:text-sm text-muted-foreground w-full">
            Error Code: {error}
          </code>
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={() => router.push("/login")} size="sm">
            {errorDetails.action}
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
