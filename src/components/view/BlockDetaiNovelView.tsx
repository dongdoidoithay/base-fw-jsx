'use client'
import { useEffect, useState } from "react";
import { MangaConten } from "./manga/MangaConten";
import { ToolsBarTopManga } from "./manga/ToolsBarTopManga";
import { ToolsBarBottomManga } from "./manga/ToolsBarBottomManga";
import Loadding from "../ui/Loadding";
import { NovelConten } from "./novel/NovelConten";
import { ToolsBarTopNovel } from "./novel/ToolsBarTopNovel";
import { HeaderNovel } from "./novel/HeaderNovel";
import { useSpeachSynthesis } from "@/hooks/useSpeachSynthesis";
import { ToolsBarPlay } from "./novel/ToolsBarPlay";
import { BlockSlide } from "../listpage/blockSlide";
import StoreLocalView from "@/utils/storeview";

export function BlockDetailNovelView({ data, current }: any) {
    const [fontSize, setFontSize] = useState("text-base");
    const [fontFamily, setFontFamily] = useState("font-roman");
    useEffect(() => {
        const _value_fontSize = localStorage.getItem("fontSizeSelect") || "text-base";
        setFontSize(_value_fontSize);

        const _value_fontFam = localStorage.getItem("fontFamSelect") || "font-roman";
        setFontFamily(_value_fontFam);
    }, []);
    useEffect(()=>{
        setTextLine(data.lsDetail?.source);
    },[data])
    StoreLocalView(current,data.lsDetail);
/**play audio */
const {
    text,
    setText,
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
    playInLine,
    setTextLine,
    textLine,   
    indexActive,
  } = useSpeachSynthesis();
    return (
        <>

            <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-9">
                            <div className="row">
                                <HeaderNovel data={data} current={current} />

                                <ToolsBarTopNovel data={data} current={current}
                                    fontSize={fontSize} setFontSize={setFontSize}
                                    fontFamily={fontFamily} setFontFamily={setFontFamily}
                                />
                                <ToolsBarPlay playInLine={playInLine} pause={pause} resume={resume} cancel={cancel}/>
                                <NovelConten data={data} current={current}
                                    fontFamilySelect={fontFamily} fontSizeSelect={fontSize}
                                    indexAudio={indexActive} isPlay={isSpeaking}
                                />
                                <ToolsBarTopNovel data={data} current={current}
                                    fontSize={fontSize} setFontSize={setFontSize}
                                    fontFamily={fontFamily} setFontFamily={setFontFamily}
                                />

                                {/*           <ToolsBarBottomNovel current="@current"
                                         dataInfo="@dataInfo"
                                         detailView="@detailView"/> */}

                                {/*  Comment */}

                            </div>
                        </div>
                        <div className="col-12 col-xl-3">
                        <BlockSlide data={[]} current={current}/>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}