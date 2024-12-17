import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-10 font-medium text-text-secondary">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/categories">Categories</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
