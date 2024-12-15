"use client";

import { signUp } from "@/app/actions/auth";
import { Button, Loader, TextField } from "@/shared/ui";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, formAction, pending] = useActionState(signUp, null);

  return (
    <form action={formAction}>
      <h1 className="text-center mb-12">Sign Up</h1>
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
      <TextField
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className="mb-6"
        error={state?.errors?.confirmPassword}
      />
      <TextField
        label="Full Name"
        id="fullname"
        name="fullname"
        className="mb-6"
        error={state?.errors?.fullname}
      />
      <p className="my-4 text-center text-text-error">{state?.errors?.root}</p>
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={pending}
      >
        {pending ? <Loader color="white" size="sm" /> : "Register"}
      </Button>
    </form>
  );
};

export default SignUpForm;
