"use client";

import Script from "next/script";
import type { FC } from "react";
import { useConsent } from "@/contexts/ConsentContext";

const Analytics: FC = () => {
  //Hooks
  const { state } = useConsent();
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!id || state?.analytics !== "granted") return null;
  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`}
    </Script>
  );
};
export default Analytics;