"use client";

import { logOut } from "@/app/_lib/_actions";
import { Button } from "@/shared/ui";
import Link from "next/link";

type AccountProps = {
  userId?: string;
};

const Account = ({ userId }: AccountProps) => {
  const handleClickLogOut = () => logOut();

  return (
    <>
      {userId ? (
        <Button variant="tertiary" onClick={handleClickLogOut}>
          Log Out
        </Button>
      ) : (
        <Link href="/sign-in" className="text-text-primary">
          Sign In
        </Link>
      )}
    </>
  );
};

export default Account;
