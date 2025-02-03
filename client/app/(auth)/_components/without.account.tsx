import Link from "next/link";

const WithoutAccount = () => {
  return (
    <p className="text-center">
      Don't have an account?{" "}
      <Link
        href="/sign-up"
        className="text-primary-300 underline hover:text-primary-400"
      >
        Sign Up
      </Link>
    </p>
  );
};

export default WithoutAccount;
