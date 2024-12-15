import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="font-semibold">
      <span className="bg-primary-300 text-[27px] text-white">Note</span>
      Book<span className="text-[27px] text-primary-300">.</span>
    </Link>
  );
};

export default Logo;
