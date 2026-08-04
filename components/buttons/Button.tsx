"use client";

import Link from "next/link";
import type { FC, MouseEvent, ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "dark" | "light";
type ButtonSize = "sm" | "md" | "lg";

type ButtonSharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isArrow?: boolean;
  isShadow?: boolean;
  ariaLabel: string;
  className?: string;
  wFull?: boolean;
  disabled?: boolean;
  children: ReactNode;
};
type LinkButtonProps = ButtonSharedProps & {
  href: string;
  type?: never;
  onClick?: () => void;
};
type NativeButtonProps = ButtonSharedProps & {
  href?: never;
  type: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
type ButtonProps = LinkButtonProps | NativeButtonProps;
const EXTERNAL_HREF = /^https?:\/\//i;
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-ink-hover active:bg-ink-hover",
  secondary: "text-ink border border-border-mid hover:bg-ink/2 active:bg-ink/2",
  tertiary: "bg-white text-ink hover:bg-ink hover:text-white active:bg-ink active:text-white",
  dark: "text-ink border border-ink hover:bg-ink hover:text-white active:bg-ink active:text-white",
  light: "bg-transparent text-white border border-white/70 hover:bg-white/10 active:bg-white/10",
};
const DROP_SHADOW_STYLES: Record<ButtonVariant, string> = {
  primary: "drop-shadow-button--ink",
  secondary: "drop-shadow-button--soft",
  tertiary: "drop-shadow-button--ink",
  dark: "drop-shadow-button--soft",
  light: "",
};
const SIZE_STYLES: Record<ButtonSize, { label: string; radius: string; circle: string; icon: number }> = {
  sm: { label: "text-sm px-5 py-2.5", radius: "rounded-[26px]", circle: "size-9", icon: 15 },
  md: { label: "text-base px-8 py-3", radius: "rounded-[32px]", circle: "size-12", icon: 18 },
  lg: { label: "text-lg px-9 py-4", radius: "rounded-[36px]", circle: "size-14", icon: 20 },
};
const Button: FC<ButtonProps> = (props) => {
  const {
    variant = "primary",
    size = "md",
    isArrow = true,
    isShadow = true,
    ariaLabel,
    className,
    wFull = false,
    disabled = false,
    children,
  } = props;
  const dims = SIZE_STYLES[size];
  const showArrow = variant === "primary" && isArrow;
  const joinArrow = showArrow && !disabled;
  const wrapperClass = twMerge(
    "group inline-flex items-center cursor-pointer",
    wFull ? "w-full" : "w-fit",
    isShadow ? DROP_SHADOW_STYLES[variant] : "",
    disabled ? "pointer-events-none cursor-not-allowed opacity-40" : "",
    className
  );
  const labelClass = twMerge(
    "flex flex-col text-center font-medium lowercase transform-gpu",
    "transition-[background-color,color,border-color,border-radius] duration-250 ease-in-out",
    dims.label,
    dims.radius,
    VARIANT_STYLES[variant],
    wFull ? "flex-1" : "",
    joinArrow ? "group-hover:rounded-r-none group-active:rounded-r-none" : ""
  );
  const circleClass = twMerge(
    "flex shrink-0 items-center justify-center rounded-full bg-ink transform-gpu",
    "transition-[translate,border-radius] duration-250 ease-in-out",
    dims.circle,
    "group-hover:-translate-x-2 group-active:-translate-x-2 group-hover:rounded-l-none group-active:rounded-l-none"
  );
  const content = (
    <span className={twMerge("flex items-center gap-2", wFull ? "w-full" : "")}>
      <span className={labelClass}>{children}</span>
      {showArrow && (
        <span className={circleClass}>
          <ArrowUpRightIcon
            size={dims.icon}
            weight="bold"
            className="text-white transition-[rotate] duration-250 ease-in-out group-hover:rotate-90 group-active:rotate-90"
          />
        </span>
      )}
    </span>
  );
  if (props.type) {
    return (
      <button
        type={props.type}
        onClick={props.onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className={wrapperClass}
      >
        {content}
      </button>
    );
  }
  if (disabled) {
    return (
      <span aria-label={ariaLabel} aria-disabled="true" className={wrapperClass}>
        {content}
      </span>
    );
  }
  const isExternal = EXTERNAL_HREF.test(props.href);
  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={wrapperClass}
    >
      {content}
    </Link>
  );
};
export default Button;