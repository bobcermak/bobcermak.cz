import type { FC } from "react";

type OptionContentProps = {
  label: string;
  sub: string;
  emphasizeSub?: boolean;
};
const OptionContent: FC<OptionContentProps> = ({ label, sub, emphasizeSub = false }) => (
  <span className="block min-w-0 leading-[1.35]">
    <span className="block text-sm font-medium text-ink xphone:text-base">{label}</span>
    <span
      className={
        emphasizeSub ? "mt-0.5 block text-xs font-semibold text-ink" : "mt-0.5 block text-xs text-text-3"
      }
    >
      {sub}
    </span>
  </span>
);
export default OptionContent;