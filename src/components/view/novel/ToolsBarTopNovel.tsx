import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { UrlDetail } from "@/utils/commons";

export function ToolsBarTopNovel({ data, current, fontSize, setFontSize, fontFamily, setFontFamily }: any) {
    const router = useRouter()

    const lsfontSize = [
        { key: "text-xs", value: "Smallest" },
        { key: "text-sm", value: "Small" },
        { key: "text-base", value: "Default" },
        { key: "text-lg", value: "Large" },
        { key: "text-xl", value: "Larger" },
        { key: "text-2xl", value: "Largest" },
    ];

    const lsfontFamily = [
        { key: "font-sans", value: "Poppin" },
        { key: "font-georgia", value: "Georgia" },
        { key: "font-roman", value: "Times New Roman" },
        { key: "font-inconsolata", value: "Inconsolata" },
        { key: "font-cinzel", value: "Cinzel" },
    ];

    function OnChangedFontSizeAsync(event: { target: { value: string } }) {
        const _value = event.target.value;
        localStorage.setItem("fontSizeSelect", _value);
        setFontSize(_value);

    }
    function OnChangedFontFamilyAsync(event: { target: { value: string } }) {
        const _value = event.target.value;
        localStorage.setItem("fontFamSelect", _value);
        setFontFamily(_value);

    }
    function OnChangedChapterSelect(event: { target: { value: string } }) {
        router.push(encodeURI(event.target.value), undefined, { shallow: false });
        router.reload();
    }
    return (<>
        <div className="col-md-12 mt-2 mb-2 notranslate">
            <div className="gray-bg-color border-radius-4 p-3">
                <div className="chapter-player-options">
                    <div className="chapter-player-options-left">
                        <div className="cm-dropdown">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ri" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885L5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <select className="js-select-fontsize" onChange={OnChangedFontSizeAsync} value={fontSize}>
                                {lsfontSize.map((item: any) => {
                                    return <option value={item.key} key={item}>{item.value}</option>
                                })}
                            </select>
                        </div>
                        <div className="cm-dropdown">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ri" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                    <path d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154l-1.6-4zm-.8-2L12 5.885L9.554 12h4.892zM3 20h18v2H3v-2z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <select className="js-select-fonttype" onChange={OnChangedFontFamilyAsync} value={fontFamily}>
                                {lsfontFamily.map((item: any) => {
                                    return <option value={item.key} key={item}>{item.value}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="chapter-player-options-right">

                        {data.lsDetail?.idDetailPrev && <a className="cm-button" href={`${UrlDetail(data?.lsDetail?.idDoc, data?.lsDetail?.idDetailPrev, current)}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 6l-6 6l6 6"></path>
                            </svg>
                            {current.lable_info.info_prev}
                        </a>}

                        <div className="cm-dropdown">
                            <select onChange={(e) => { OnChangedChapterSelect(e) }} value={`${UrlDetail(data.lsDetail?.idDoc, data.lsDetail.idDetail, current)}`}>
                                {data.chapterList && data.chapterList.map((item: any) => {
                                    return <option value={`${UrlDetail(item?.idDoc, item.idDetail, current)}`} key={item.idDetail}>{item.nameChapter}</option>
                                })}
                            </select>
                        </div>

                        {data.lsDetail?.idDetailNext && <a className="cm-button" href={`${UrlDetail(data?.lsDetail?.idDoc, data?.lsDetail?.idDetailNext, current)}`}>
                            {current.lable_info.info_next}
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </a>
                        }

                    </div>
                </div>
            </div>
        </div>
    </>);
}