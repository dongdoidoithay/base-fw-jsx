'use client'
import Head from "next/head";
import Script from "next/script";
import React from "react";
/**
 * 
 * @param param0 
 * @returns banner 
 */
function AdsYandex({ current }: any) {
    let _key = '';
    if (current.setting.ads.find((p:any) => p.key == "yandex") != null) {
        var ads = current.setting.ads.find((p:any) => p.key == "yandex");
        if (ads != null) {
            _key = ads?.value;
        }
    }
    return (
        <>
            {_key && 
            <div style={{textAlign: "center", "marginTop": "5px" }} suppressHydrationWarning >
                <Head>
                    <script>window.yaContextCb=window.yaContextCb||[]</script>
                    <script src="https://yandex.ru/ads/system/context.js" async></script>
                </Head>
                <div id={`"yandex_rtb_${_key}"`}></div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        document.addEventListener("DOMContentLoaded", function() 
                        {
                            window.yaContextCb.push(()=>{
                                Ya.Context.AdvManager.render({
                                "blockId": "${_key}",
                                "renderTo": "yandex_rtb_${_key}"
                                })
                        })
                    }); `,
                    }}
                />
            </div>
            }
        </>
    );
}

export default React.memo(AdsYandex);
