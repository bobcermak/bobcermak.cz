import type { FC } from "react";
import { EnvelopeSimpleIcon, LightningIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/ssr";
import { CONTACT_INFO, type ContactInfoIcon } from "@/types/contact";

const ICONS: Record<ContactInfoIcon, typeof EnvelopeSimpleIcon> = {
  mail: EnvelopeSimpleIcon,
  phone: PhoneIcon,
  speed: LightningIcon,
  place: MapPinIcon,
};
const TILE = "grid size-9 flex-none place-items-center rounded-[10px] bg-ink text-white";
const ContactInfo: FC = () => (
  <ul className="flex flex-col gap-3.5">
    {CONTACT_INFO.map((item) => {
      const Icon = ICONS[item.icon];
      const icon = (
        <span aria-hidden="true" className={TILE}>
          <Icon size={16} weight={item.icon === "speed" ? "fill" : "regular"}/>
        </span>
      );
      return (
        <li key={item.label}>
          {item.href ? (
            <a href={item.href} className="group flex w-fit max-w-full items-center gap-3">
              <span
                aria-hidden="true"
                className={`${TILE} transition-transform duration-250 ease-[cubic-bezier(.2,.8,.25,1)] group-hover:-rotate-6 group-active:-rotate-6`}
              >
                <Icon size={16}/>
              </span>
              <span className="min-w-0 wrap-break-word text-sm text-text-2 transition-colors duration-250 group-hover:text-ink group-active:text-ink">
                {item.label}
              </span>
            </a>
          ) : (
            <span className="flex items-center gap-3">
              {icon}
              <span className="min-w-0 text-sm text-text-2">{item.label}</span>
            </span>
          )}
        </li>
      );
    })}
  </ul>
);
export default ContactInfo;