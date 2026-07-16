import Link from "next/link";
import { FC } from "react";

type NavLinkProps = {
  href: string,
  label: string,
  onClick?: () => void
};
const NavLink: FC<NavLinkProps> = ({ href, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block w-fit rounded-full px-4 py-2 text-body lowercase text-ink transition-colors duration-250 hover:bg-ink/5 active:bg-ink/5"
  >
    {label}
  </Link>
);
export default NavLink;