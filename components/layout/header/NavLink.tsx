"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

type NavLinkProps = {
  href: string,
  label: string,
  onClick?: () => void
};
const NavLink: FC<NavLinkProps> = ({ href, label, onClick }) => {
  //Hooks
  const pathname = usePathname();
  const active = !href.includes("#") && pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      scroll={href.includes("#") ? false : undefined}
      aria-current={active ? "page" : undefined}
      className={`block w-fit rounded-full px-4 py-2 text-body lowercase transition-colors duration-250 hover:bg-ink/5 active:bg-ink/5 ${
        active ? "text-accent-blue-strong" : "text-ink"
      }`}
    >
      {label}
    </Link>
  );
};
export default NavLink;