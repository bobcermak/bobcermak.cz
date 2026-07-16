import Button from "@/components/buttons/Button";
import NavbarClient from "./NavbarClient";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { NAV_LINKS } from "./navLinks";

const Navbar = () => {
  return (
    <NavbarClient logo={<Logo/>}>
      {NAV_LINKS.map((item) => (
        <li key={item.href}>
          <NavLink href={item.href} label={item.label} />
        </li>
      ))}
      <li className="pt-2 laptop:pt-0 laptop:ml-1">
        <Button href="#kontakt" wFull ariaLabel="Kontakt" className="laptop:w-fit">
          Kontakt
        </Button>
      </li>
    </NavbarClient>
  );
};
export default Navbar;