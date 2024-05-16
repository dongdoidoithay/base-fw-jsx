'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns popup 
 */
function AdsMonetagPopup({ current }: any) {
    let _key = '';
    if (current.setting.ads.find((p:any) => p.key == "galaksion") != null) {
        var ads = current.setting.ads.find((p:any) => p.key == "galaksion");
        if (ads && ads?.value) {
            _key = ads?.value;
        }
    }
    return (
        <>
            {_key &&
                 <div style={{textAlign: "center", "marginTop": "5px" }} suppressHydrationWarning >
                    <Script async src={`${_key}`}></Script>
                </div>
            }
        </>
    );
}

export default React.memo(AdsMonetagPopup);
