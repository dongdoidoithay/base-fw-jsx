'use client'
import Loadding from "@/components/ui/Loadding";
import { UrlInfo, TitleShow, TypeDoc, UrlDetail } from "@/utils/commons";
import Ads_Block_Banner from "../ads/Ads_Block_Banner";
import { HistoryView } from "./HistoryView";
const _ld = require('lodash');


function renderPrgres() {
    let count =_ld.random(20,100);
     //getRandomFloat().toFixed(2);
     //console.log(count);
    return (<div className="side-bars-prgres">
        <div className="side-bars-progres-bar-line" style={{ "width": `${count}%` }} suppressHydrationWarning></div>
    </div>)
}

export function SlideBar({ dataToview, current }: any) {
    return (
        <>
            <div className="side-bars notranslate">
              <Ads_Block_Banner current={current}/>
              <HistoryView  current={current}/>
                <h2>MOST VIEWED MANGA</h2>
                <div className="row">
                    {!dataToview && <Loadding />}
                    {dataToview && dataToview.map((item: any, index: any) => {

                        return (
                            <div className="side-bars-item" key={item.idDoc}>
                                <div className="side-bars-left">
                                    <div className="side-bars-score">
                                        <a href={`${UrlInfo(item.idDoc, current)}`}
                                            title={`${TitleShow(item.name, TypeDoc.Info, current, "1", item.nameOther, "", item.authName, item.desc, item.nameOther)}`}
                                        >
                                            {index + 1}
                                        </a>
                                    </div>
                                </div>
                                <div className="side-bars-right">
                                    <div className="side-bars-name max-caracter-1">
                                        <a href={`${UrlInfo(item.idDoc, current)}`}
                                            title={`${TitleShow(item.name, TypeDoc.Info, current, "1", item.nameOther, "", item.authName, item.desc, item.nameOther)}`}
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                    {renderPrgres()}
                                    {/*  <div className="side-bars-prgres">
                                    <div className="side-bars-progres-bar-line" style={{ "width":`${count} %` }}></div>
                                </div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    );
}

export default SlideBar;