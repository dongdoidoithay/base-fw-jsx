'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns popup
 */
function Ads_Monetag_Popup({ current }: any) {
    let _key = '';
    if (current.setting.ads.find((p: any) => p.key == "monetag-popup") != null) {
        var ads = current.setting.ads.find((p: any) => p.key == "monetag-popup");
        if (ads && ads?.value) {
            _key = ads?.value;
        }
    }

    return (
        <>
            {_key && <script
                dangerouslySetInnerHTML={{
                    __html: `
                                document.addEventListener("DOMContentLoaded", function() 
                                {
                                    (function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gloaphoo.net',${_key},document.createElement('script'))
                                })
                            }); `,
                }}
            />}
        </>
    );
}

export default React.memo(Ads_Monetag_Popup);
