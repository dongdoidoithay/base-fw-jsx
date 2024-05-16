'use client'
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns  popup
 */
function Ads_Popcash({ current }: any) {
    let _key = '';
    if (current.setting.ads.find((p:any) => p.key == "popcash-popup") != null) {
        var ads = current.setting.ads.find((p:any) => p.key == "popcash-popup");
        if (ads != null) {
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
                            var uid = '198238';
                            var wid = '${_key}';
                            var pop_tag = document.createElement('script');pop_tag.src='//cdn.popcash.net/show.js';document.body.appendChild(pop_tag);
                            pop_tag.onerror = function() {pop_tag = document.createElement('script');pop_tag.src='//cdn2.popcash.net/show.js';document.body.appendChild(pop_tag)};
                        })
                    }); `,
                    }}
                />
            }
        </>
    );
}

export default React.memo(Ads_Popcash);
