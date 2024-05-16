'use client'
import Script from "next/script";
import React from "react";

function Analytics({ current }:any) {
  return (
    <>
      <Script  async src={`https://www.googletagmanager.com/gtag/js?id=${current?.setting?.analytics_key}`}></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener("DOMContentLoaded", function() 
            {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${current?.setting?.analytics_key}');
            }); `,
        }}
      />
    </>
  );
}

export default React.memo(Analytics);
