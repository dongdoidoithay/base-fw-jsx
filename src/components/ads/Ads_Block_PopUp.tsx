'use client'
import Script from "next/script";
import React from "react";
import sample from "lodash/sample";
import Ads_Popcash from "./Ads_Popcash";
import Ads_Monetag_Inital from "./Ads_Monetag_Inital";
import Ads_Monetag_Popup from "./Ads_Monetag_Popup";
/**
 * 
 * @param param0 
 * @returns  show one Popup in domain random
 */
function Ads_Block_PopUp({ current }: any) {
    let allowPopup: any = [];
    allowPopup = current.setting.ads.filter((p: any) => p.type == "popup");
    const _select_popup_key: any = sample(allowPopup)?.key;
    console.log('select_popup:', _select_popup_key);
    switch (_select_popup_key) {
        case 'popcash-popup':
            return <Ads_Popcash current={current} />
        case 'monetag-inital':
            return <Ads_Monetag_Inital current={current} />
        case 'monetag-popup':
            return <Ads_Monetag_Popup current={current} />
        default:
            return <></>
    }
}

export default React.memo(Ads_Block_PopUp);
