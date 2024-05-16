'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns popup
 */
function Ads_Monetag_Inital({ current }:any) {
    let _key='';
    if (current.setting.ads.find((p:any) => p.key == "monetag-inital" ) != null)
    {
        var ads = current.setting.ads.find((p:any) => p.key == "monetag-inital" );
        if (ads && ads?.value)
        { 
            _key= ads?.value;
        }
    }

    return (
        <>
            <div style={{ textAlign: "center","marginTop": "5px" }} suppressHydrationWarning >
            <Script async src={`${_key}`}></Script>
            </div>
        </>
    );
}

export default React.memo(Ads_Monetag_Inital);
