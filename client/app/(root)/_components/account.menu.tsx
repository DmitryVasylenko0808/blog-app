"use client";

import { logOut } from "@/app/_lib/_actions";
import { UserDetails } from "@/services/users/dto/get.one.user.dto";
import { User, SquarePen, LogOut } from "lucide-react";
import Link from "next/link";

type AccountMenuProps = { user: UserDetails };

const AccountMenu = ({ user }: AccountMenuProps) => {
  const handleClickLogOut = () => logOut();

  return (
    <div className="min-w-max py-1 bg-white shadow-xl">
      <ul className="flex flex-col text-sm text-text-meta">
        <li className="py-1.5 px-3 hover:bg-primary-100">
          <Link href={`/users/${user.id}`}>
            <User size={20} className="inline" /> My profile
          </Link>
        </li>
        <li className="py-1.5 px-3 hover:bg-primary-100">
          <Link href="/articles/create">
            <SquarePen size={20} className="inline" /> Write an article
          </Link>
        </li>
        <li className="py-1.5 px-3">
          <div className="w-full h-[1px] bg-text-meta" />
        </li>
        <li
          className="py-1.5 px-3 hover:bg-primary-100 cursor-pointer"
          onClick={handleClickLogOut}
        >
          <LogOut size={20} className="inline" /> Log Out
        </li>
      </ul>
    </div>
  );
};

export default AccountMenu;
