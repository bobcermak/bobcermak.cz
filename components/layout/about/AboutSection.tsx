import Image from "next/image";
import { Fragment } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import ProjectTag from "../projects/ProjectTag";
import { yearsSince } from "@/lib/age";
import { ABOUT_BIRTH, ABOUT_SECTION_ID, ABOUT_SIGNATURE, ABOUT_STACK, aboutBio } from "@/types/about";

const AboutSection = () => {
  const age = yearsSince(ABOUT_BIRTH);
  const words = aboutBio(age).split(" ");
  return (
    <section
      id={ABOUT_SECTION_ID}
      aria-label="O mně"
      className="relative flex min-h-svh w-full items-center mt-40"
    >
      <Image
        src={ABOUT_SIGNATURE}
        alt=""
        aria-hidden="true"
        width={500}
        height={315}
        priority={false}
        className="pointer-events-none absolute bottom-20 right-[5svw] z-0 w-56 select-none opacity-80 stablet:w-72 mlaptop:bottom-10 mlaptop:w-96"
      />
      <div data-stage-depth className="relative z-10 mx-auto w-container mt-18">
        <p className="mb-7 flex items-center gap-2.5 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3">
          <span
            aria-hidden="true"
            className="block size-2 flex-none rounded-full bg-accent-purple-strong ring-4 ring-accent-purple-strong/25 motion-safe:animate-pulse"
          />
          O mně
        </p>
        <p className="text-[clamp(1.75rem,5.2vw,4.5rem)] font-semibold leading-[1.14] tracking-[-0.035em] text-ink">
          {words.map((word, i) => (
            <Fragment key={`${i}-${word}`}>
              <span data-fill>{word}</span>{" "}
            </Fragment>
          ))}
        </p>
        <ul className="mt-10 flex flex-wrap gap-2">
          {ABOUT_STACK.map((item) => (
            <li key={item} data-stage-chip>
              <ProjectTag>{item}</ProjectTag>
            </li>
          ))}
        </ul>
        <p
          data-stage-cue
          aria-hidden="true"
          className="scroll-stage__cue mt-4 items-center gap-2.5 text-eyebrow font-semibold uppercase tracking-[0.14em] text-text-3"
        >
          <span className="block h-px w-10 bg-accent-purple-strong"/>
          Co dělám
          <ArrowRightIcon size={14} weight="bold" className="text-accent-purple-strong"/>
        </p>
      </div>
    </section>
  );
};
export default AboutSection;