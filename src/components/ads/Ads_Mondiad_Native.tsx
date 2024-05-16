'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns Navtive -banenr
 */
function AdsMondiadNative({ current }:any) {
    let _key='';
    if (current.setting.ads.find((p:any) => p.key == "mondiad-native" ) != null)
    {
        var ads = current.setting.ads.find((p:any) => p.key == "mondiad-native" );
        if (ads && ads?.value)
        { 
            _key= ads?.value;
        }
    }

    return (
        <>
            <div style={{ textAlign: "center","marginTop": "5px" }} suppressHydrationWarning >
            <Script async src="https://ss.nwemnd.com/native.js"></Script>
            <div data-mndbanid={`${_key}`} suppressHydrationWarning ></div>
            </div>
        </>
    );
}

export default React.memo(AdsMondiadNative);
