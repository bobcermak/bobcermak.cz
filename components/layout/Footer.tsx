import Link from "next/link";

const Footer = () => {
  const SOCIALS = [
    {
      href: "https://github.com/bobcermak",
      label: "GitHub",
      icon: (
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      ),
    },
    {
      href: "https://www.linkedin.com/in/bobcermak",
      label: "LinkedIn",
      icon: (
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      ),
    },
    {
      href: "mailto:ahoj@bobcermak.cz",
      label: "Email",
      icon: (
        <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.4.5 7.6 5.05L19.6 6H4.4ZM20 7.28l-7.44 4.94a1 1 0 0 1-1.12 0L4 7.28V18h16V7.28Z" />
      ),
    },
  ];
  return (
    <footer id="kontakt" className="mt-24 border-t border-border bg-bg-soft">
      <div className="mx-auto flex w-container max-w-[1120px] flex-col gap-12 py-16 slaptop:flex-row slaptop:items-end slaptop:justify-between">
        <div>
          <p className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-ink">
            Máš projekt?
            <br />
            <span className="text-placeholder">Napiš mi.</span>
          </p>
          <Link
            href="mailto:ahoj@bobcermak.cz"
            className="mt-5 inline-block text-sub font-medium text-ink transition-colors hover:text-text-2 active:text-text-2"
          >
            ahoj@bobcermak.cz
          </Link>
        </div>
        <nav aria-label="Sociální sítě" className="flex items-center gap-3">
          {SOCIALS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-white text-ink transition-colors hover:border-ink hover:bg-bg-tint active:border-ink active:bg-bg-tint"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
                {social.icon}
              </svg>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex w-container max-w-[1120px] flex-col gap-2 border-t border-border py-6 text-sm text-text-3 xphone:flex-row xphone:items-center xphone:justify-between">
        <p className="text-text-3">© 2026 Bob Čermák</p>
        <Link
          href="https://github.com/bobcermak/bobcermak.cz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-3 transition-colors hover:text-ink active:text-ink"
        >
          Open source · GitHub
        </Link>
      </div>
    </footer>
  );
};
export default Footer;