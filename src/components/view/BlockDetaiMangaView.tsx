'use client'
import { useEffect, useState } from "react";
import { MangaConten } from "./manga/MangaConten";
import { ToolsBarTopManga } from "./manga/ToolsBarTopManga";
import { ToolsBarBottomManga } from "./manga/ToolsBarBottomManga";
import Loadding from "../ui/Loadding";
import { ViewSeo } from "./ViewSeo";
import StoreLocalView from "@/utils/storeview";

export function BlockDetailMangaView({ data, current }: any) {
    const [optionView, setOptionView] = useState("one");
    const [imageNext, setImageNext] = useState(1);
    const [imagePrev, setImagePrev] = useState(-1);
    const [imageSelect, setImageSelect] = useState(0);
    useEffect(() => {
        const _value = localStorage.getItem("viewMode") || "one";
        setOptionView(_value);
    }, []);
    if (!data || !data.infoDoc) {
        return <Loadding />
    }

    StoreLocalView(current,data.lsDetail);
    
    return (
        <>
            <ViewSeo data={data} current={current}/>
            <ToolsBarTopManga data={data} current={current}
                optionView={optionView} setOptionView={setOptionView}
                imageNext={imageNext} setImageNext={setImageNext}
                imagePrev={imagePrev} setImagePrev={setImagePrev}
                imageSelect={imageSelect} setImageSelect={setImageSelect}
            />
            <MangaConten data={data} current={current}
                optionView={optionView}
                imageNext={imageNext} setImageNext={setImageNext}
                imagePrev={imagePrev} setImagePrev={setImagePrev}
                imageSelect={imageSelect} setImageSelect={setImageSelect}
            />
            <ToolsBarBottomManga data={data} current={current}
                optionView={optionView} setOptionView={setOptionView}
                imageNext={imageNext} setImageNext={setImageNext}
                imagePrev={imagePrev} setImagePrev={setImagePrev}
                imageSelect={imageSelect} setImageSelect={setImageSelect}
            />
            {/* <StoreLocalView data={data.lsDetail} current={current}/> */}
           {/*  Comment */}
        </>
    );
}