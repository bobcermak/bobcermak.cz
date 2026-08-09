"use client";

import { Fragment, useCallback, useEffect, useState, type FC, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

type Slide = {
  key: string;
  content: ReactNode;
};
type CardSwiperProps = {
  slides: Slide[];
  label: string;
};
const ARROW = "grid size-11 cursor-pointer place-items-center rounded-full border border-border-mid bg-white text-ink transition-colors duration-250 hover:border-ink hover:bg-ink hover:text-white active:border-ink active:bg-ink active:text-white disabled:cursor-not-allowed disabled:border-border disabled:bg-white disabled:text-muted-num";
const CardSwiper: FC<CardSwiperProps> = ({ slides, label }) => {
  //Hooks
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState<number>(0);
  const [canPrev, setCanPrev] = useState<boolean>(false);
  const [canNext, setCanNext] = useState<boolean>(false);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
      const snaps = emblaApi.scrollSnapList().length;
      setProgress(snaps > 1 ? emblaApi.selectedScrollSnap() / (snaps - 1) : 1);
    };
    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const steerable = slides.length > 1;
  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {slides.map((slide) => (
            <div key={slide.key} className="min-w-0 flex-[0_0_85%] xphone:flex-[0_0_60%] stablet:flex-[0_0_45%]">
              <Fragment>{slide.content}</Fragment>
            </div>
          ))}
        </div>
      </div>
      {steerable && (
        <div className="mt-6 flex items-center gap-5">
          <div
            aria-hidden="true"
            className="h-1.5 w-full max-w-50 overflow-hidden rounded-full bg-border"
          >
            <div
              className="h-full origin-left rounded-full bg-ink transition-transform duration-250 ease-[cubic-bezier(.2,.8,.25,1)]"
              style={{ transform: `scaleX(${progress || 0.08})` }}
            />
          </div>
          <div className="ml-auto flex gap-2.5">
            <button type="button" onClick={scrollPrev} disabled={!canPrev} aria-label="Předchozí projekt" className={ARROW}>
              <CaretLeftIcon size={16} weight="bold"/>
            </button>
            <button type="button" onClick={scrollNext} disabled={!canNext} aria-label="Další projekt" className={ARROW}>
              <CaretRightIcon size={16} weight="bold"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CardSwiper;