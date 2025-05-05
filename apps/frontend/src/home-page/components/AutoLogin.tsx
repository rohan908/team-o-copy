import { useEffect } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react";

// This file will sign you in based on login info in the browser link
// only really used in RFID sign in
export function AutoLogin() {
  const { isLoaded, signIn } = useSignIn();
  const clerk = useClerk();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || undefined;
    const password = params.get("password") || undefined;

    // just in case we want to redirect staff to a different page on login
    const redirectTo = params.get("redirectTo") || "/";

    if (!isLoaded || !email || !password) return;

    (async () => {
      try {
        const attempt = await signIn.create({
          strategy: "password",
          identifier: email,
          password,
        });

        if (attempt.status === "complete" && attempt.createdSessionId) {
          await clerk.setActive({ session: attempt.createdSessionId });
          window.location.replace(redirectTo);
        } else {
          console.error("Sign-in failed:", attempt);
          window.location.replace("/sign-in?error=auth_failed");
        }

      } catch (err) {
        console.error("Auto-login error:", err);
        window.location.replace("/sign-in?error=network");
      }
    })();
  }, [isLoaded, signIn, clerk]);
}
