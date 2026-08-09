"use client";

import { useEffect, useState } from "react";

/**
 * Na serveru i při prvním renderu na klientovi vrací `false` — jinak by se HTML ze serveru
 * rozešlo s tím, co vykreslí prohlížeč, a React by zahlásil hydration mismatch. Skutečná
 * hodnota naskočí až po připojení, takže výchozí větev musí být ta, kterou chceš v HTML.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return matches;
};
export default useMediaQuery;
