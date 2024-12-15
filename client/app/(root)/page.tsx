import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <div className="flex flex-col gap-2">
        <Link href="/">Home</Link>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/sign-in">Sign In</Link>
      </div>
    </div>
  );
}
