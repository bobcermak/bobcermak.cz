import { type FC } from "react";
import { Button } from "@/components";

type PoweredByProps = {
  powered?: string;
  firstName?: string;
  lastName?: string;
  link: string;
};
const PoweredBy: FC<PoweredByProps> = ({ powered = "powered", firstName, lastName, link }) => {
  return (
    <Button
      href={link}
      noStyle
      ariaLabel={`${powered} by ${firstName ?? ""} ${lastName ?? ""}`.trim()}
      hover="hover:text-accent-blue active:text-accent-blue transition-colors duration-250"
      className="font-orbitron text-text-3"
    >
      {powered} by #<span className="font-outfit font-bold text-[20px]">{firstName}</span>
      <span>{lastName}</span>
    </Button>
    
  );
};
export default PoweredBy;