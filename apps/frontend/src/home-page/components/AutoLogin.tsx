import { useEffect } from "react";
import { useSignIn, useClerk } from "@clerk/clerk-react";

export function AutoLogin() {
  const { isLoaded, signIn } = useSignIn();
  const clerk = useClerk();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || undefined;
    const password = params.get("password") || undefined;
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

  // this link has the admin login info
  // /auto-login?email=softengD25O@gmail.com&password=cs3733D25O&redirectTo=/
}
