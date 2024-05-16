'use client'
import Script from "next/script";
import React from "react";
import sample from "lodash/sample";
import Ads_Yandex from "./Ads_Yandex";
import Ads_AdsPubfuture_Banner from "./Ads_AdsPubfuture_Banner";
import Ads_Adsterra from "./Ads_Adsterra";

/**
 * 
 * @param param0 
 * @returns  show one banner in domain random
 */
function Ads_Block_Banner({ current }: any) {
    let allowBanner: any = [];
    allowBanner = current.setting.ads.filter((p: any) => p.type == "banner");
    const _select_banner_key: any = sample(allowBanner)?.key;
    console.log('select_banner:', _select_banner_key);
    switch (_select_banner_key) {
        case 'yandex':
            return <Ads_Yandex current={current} />
        case 'pubfuture-banner':
            return <Ads_AdsPubfuture_Banner current={current} />
        case 'adsterra':
            return <Ads_Adsterra current={current} />
        default:
            return <>ADVERTISEMENT</>
    }
}

export default React.memo(Ads_Block_Banner);
