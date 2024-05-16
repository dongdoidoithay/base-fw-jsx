'use client'
import Script from "next/script";
import React from "react";
import sample from "lodash/sample";
import Ads_AdsPubfuture_Sticky from "./Ads_AdsPubfuture_Sticky";

/**
 * 
 * @param param0 
 * @returns  show one Popup in domain random
 */
function Ads_Block_Sticky({ current }: any) {
    let allowSticky: any = [];
    allowSticky = current.setting.ads.filter((p: any) => p.type == "popup");
    const _select_sticky_key: any = sample(allowSticky)?.key;
    console.log('_select_sticky_key:', _select_sticky_key);
    switch (_select_sticky_key) {
        case 'pubfuture-sticky':
            return <Ads_AdsPubfuture_Sticky current={current} />
       
        default:
            return <></>
    }
}

export default React.memo(Ads_Block_Sticky);
