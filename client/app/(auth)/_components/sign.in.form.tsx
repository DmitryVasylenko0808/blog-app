"use client";

import { signIn } from "@/app/(auth)/_lib/actions";
import { TextField, Button, Loader } from "@/shared/ui";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction}>
      <h1 className="text-center mb-12">Sign In</h1>
      <TextField
        label="Username"
        id="username"
        name="username"
        className="mb-6"
        error={state?.errors?.username}
      />
      <TextField
        label="Password"
        type="password"
        id="password"
        name="password"
        className="mb-6"
        error={state?.errors?.password}
      />
      <p className="my-4 text-center text-text-error">{state?.errors?.root}</p>
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={pending}
      >
        {pending ? <Loader color="white" size="sm" /> : "Login"}
      </Button>
    </form>
  );
};

export default SignInForm;
