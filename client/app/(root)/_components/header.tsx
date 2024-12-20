import Link from "next/link";
import { Container } from "@/shared/ui";
import { Logo } from "@/shared/components";
import { SearchIcon } from "lucide-react";
import { verifySession } from "@/app/_lib/session";
import Account from "./account";
import NavBar from "./navbar";

const Header = async () => {
  const session = await verifySession();

  return (
    <header className="relative h-header bg-primary-200">
      <Container className="flex justify-between items-center">
        <NavBar />
        <Logo />
        <div className="flex items-center gap-11">
          <Link href="/search" className="text-text-primary">
            <SearchIcon size={18} />
          </Link>
          {session?.userId ? (
            <Account userId={session?.userId} />
          ) : (
            <Link href="/sign-in" className="text-text-primary">
              Sign In
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
