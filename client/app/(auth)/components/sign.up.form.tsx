import { Button, TextField } from "@/shared/ui";

const SignUpForm = () => {
  return (
    <form>
      <h1 className="text-center mb-12">Sign Up</h1>
      <TextField
        label="Username"
        id="username"
        name="username"
        className="mb-6"
      />
      <TextField
        label="Password"
        type="password"
        id="password"
        name="password"
        className="mb-6"
      />
      <TextField
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className="mb-6"
      />
      <TextField
        label="Full Name"
        id="fullname"
        name="fullname"
        className="mb-10"
      />
      <Button type="submit" variant="primary" size="md" className="w-full">
        Register
      </Button>
    </form>
  );
};

export default SignUpForm;
