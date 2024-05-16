'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns banen
 */
function AdsMondiadBaner({ current }:any) {
    let _key='';
    if (current.setting.ads.find((p:any) => p.key == "mondiad-banner" ) != null)
    {
        var ads = current.setting.ads.find((p:any) => p.key == "mondiad-banner" );
        if (ads && ads?.value)
        { 
            _key= ads?.value;
        }
    }

    return (
        <>
            <div style={{textAlign: "center", "marginTop": "5px" }}>
            <Script async src="https://ss.nwemnd.com/banner.js" ></Script>
            <div data-mndbanid={`${_key}`} suppressHydrationWarning ></div>
            </div>
        </>
    );
}

export default React.memo(AdsMondiadBaner);
