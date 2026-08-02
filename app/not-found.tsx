import { Button } from "@/components";

const NotFoundPage = () => {
  return (
    <section
      aria-label="Stránka nenalezena"
      className="mx-auto flex min-h-dvh w-container max-w-280 flex-col items-center justify-center gap-6 py-32 text-center"
    >
      <p className="text-[clamp(4rem,14vw,9rem)] font-semibold leading-none tracking-[-0.04em] text-muted-num">
        404
      </p>
      <h1 className="text-title text-ink">Tady nic není.</h1>
      <p className="max-w-[46ch] text-center text-text-2">
        Tahle stránka neexistuje nebo se přestěhovala. Vrať se na úvod a najdeš, co potřebuješ.
      </p>
      <Button href="/" ariaLabel="Zpět na úvod">
        Zpět na úvod
      </Button>
    </section>
  );
};
export default NotFoundPage;