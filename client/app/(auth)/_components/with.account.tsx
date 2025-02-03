import Link from "next/link";

const WithAccount = () => {
  return (
    <p className="text-center">
      Already have an account?{" "}
      <Link
        href="/sign-in"
        className="text-primary-300 underline hover:text-primary-400"
      >
        Sign In
      </Link>
    </p>
  );
};

export default WithAccount;
