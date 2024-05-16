'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns  Banner _
 */
function AdsPubfutureBanner({ current }: any) {
    let _key = '';
    let _unit = '';
    if (current.setting.ads.find((p:any) => p.key == "pubfuture-banner") != null) {
        var ads = current.setting.ads.find((p:any) => p.key == "pubfuture-banner");
        if (ads != null) {
            _key = ads?.value;
           _unit = ads?.unit;
        }
    }
    return (
        <>
            {_key  && _unit && 
            <div style={{ textAlign: "center","marginTop": "5px" }}>
            <Script async src={`https://cdn.pubfuture-ad.com/v2/unit/pt.js`}></Script>
               <div id={`"${_key}"`} suppressHydrationWarning >
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                            document.addEventListener("DOMContentLoaded", function() 
                            {
                            window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "${_unit}", id: "${_key}"})
                            }); `,
                        }}
                    />
                </div>
            </div>
            }
        </>
    );
}

export default React.memo(AdsPubfutureBanner);
