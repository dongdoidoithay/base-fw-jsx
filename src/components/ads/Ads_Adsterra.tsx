'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns banner
 */
function Adsterra({ current }: any) {
    let _key = '';
    if (current.setting.ads.find((p:any) => p.key == "adsterra") != null) {
        var ads = current.setting.ads.find((p:any) => p.key == "adsterra");
        if (ads && ads?.value) {
            _key = ads?.value;
        }
    }

    return (
        <>
            {_key &&
                <div style={{ textAlign: "center","marginTop": "5px" }} suppressHydrationWarning >
                    <iframe className="inline" src={`//marathonpleadparachute.com/watchnew?key=${_key}`} height="250" width="300" frameBorder={"0"} scrolling="no"></iframe>
                </div>
            }
        </>
    );
}

export default React.memo(Adsterra);
