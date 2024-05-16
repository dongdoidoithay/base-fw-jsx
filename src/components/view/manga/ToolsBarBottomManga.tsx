import { TypeDoc, UrlCurrentType, UrlDetail, UrlInfo, UrlOption } from "@/utils/commons";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from 'next/router';

export function ToolsBarBottomManga({ data, current,
                                    optionView,setOptionView,
                                    imageNext,setImageNext,
                                    imagePrev,setImagePrev,
                                    imageSelect,setImageSelect
                                    }: any) {
    const router=useRouter();
    let lsImage: any = [];
    if (data) {
        lsImage = data.lsDetail?.source?.split("#");
    }
    //console.log(lsImage);
    const lsviewMode = [{ key: "one", value: "Single Page" }, { key: "all-pages", value: "All Pages" }];

    function OnChangedViewMode(event: { target: { value: string } }){
        const _val=event.target.value;
        //console.log("eval__",_val);
        setOptionView(_val);
        localStorage.setItem("viewMode",_val);
        if(_val=="one"){
            setImagePrev(-1);
            setImageNext(1);
        }
    }
    //console.log("|->",optionView);
    function OnChangedImageSelect(event: { target: { value: string } }){
        setImageNext(0);
        setImagePrev(0);
        const _valSelect=event.target.value;
        if(_valSelect){
            const _indexSelect=parseInt(_valSelect);
            if(_indexSelect>0)
                setImagePrev(_indexSelect-1);
            else
                setImagePrev(-1);
            if(_indexSelect<lsImage.length-1)
                setImageNext(_indexSelect+1);
            else
                setImageNext(-1);
            setImageSelect(_indexSelect);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function OnChangedChapterSelect(event: { target: { value: string } }){
        router.push(encodeURI(event.target.value),undefined, { shallow: true });
        router.reload();
    }
    function OnNextImage(){
       
        if(imageSelect<lsImage.length-1){
            setImageSelect(imageSelect+1);
            if(imageSelect+1<lsImage.length-1)
            {
                 setImageNext(imageSelect+2);
            }
            setImagePrev(imageSelect-1);
        }
        else
        {
             setImageNext(-1);
            setImageSelect(0);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    function OnPrevImage(){
        if(imageSelect-1>0){
            setImageSelect(imageSelect-1);
            setImageNext(imageSelect);
            if(imageSelect-2>0)
            {
                setImagePrev(imagePrev-2);
            }
        }
        else
         {   
            setImagePrev(-1);
            setImageSelect(0);
         }
         window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <>
            <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-12">
                            <div className="row">
                                {(optionView == "one") && <div className="col-md-12 mt-2 mb-2">
                                    <div className="gray-bg-color border-radius-4 p-3">
                                        <div className="chapter-player-options">
                                            <div className="chapter-player-options-left">
                                                <div className="cm-dropdown">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--gridicons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M15 7.5a1.5 1.5 0 1 1 3.001.001A1.5 1.5 0 0 1 15 7.5zM4 20h14a2 2 0 0 1-2 2H4c-1.1 0-2-.9-2-2V8a2 2 0 0 1 2-2v14zM22 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zM8 4v6.333L11 7l4.855 5.395l.656-.731a2 2 0 0 1 2.976 0l.513.57V4H8z"></path>
                                                        </svg>
                                                    </span>
                                                    <select onChange={(e) => {OnChangedChapterSelect(e)}} value={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetail, current)}`}>
                                                        {data.chapterList && data.chapterList.map((item: any) => {
                                                            return <option value={`${UrlDetail(item?.idDoc, item.idDetail, current)}`} key={item.idDetail}>{item.nameChapter}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="cm-dropdown">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M5 9.5L7.5 14h-5L5 9.5M3 4h4v4H3V4m2 16a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2M9 5v2h12V5H9m0 14h12v-2H9v2m0-6h12v-2H9v2Z"></path>
                                                        </svg>
                                                    </span>
                                                    <select onChange={(e)=>OnChangedViewMode(e)} value={optionView}>
                                                        {lsviewMode && lsviewMode.map((item: any) => {
                                                            return <option value={`${item.key}`} key={item.key}>{item.value}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" chapter-player-options-right mt-md-3 mt-lg-0">
                                                <a className="cm-button me-sm-auto js-add-to bookmark-btn" href="jstrokeWidth" data-type="subscribe" data-novel-id="16113" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="Bookmark">
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"></path>
                                                    </svg>
                                                </a>

                                                <button className="cm-button red-bg-color pbl-white-color js-report" data-novel-id="16113" data-chapter-id="767556">
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3c0-.72.58-1.3 1.3-1.3c.72 0 1.3.58 1.3 1.3c0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path>
                                                    </svg>Report
                                                </button>

                                                {(imagePrev != -1) && <a className="cm-button" style={{ "cursor": "pointer" }} onClick={()=>OnPrevImage()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 6l-6 6l6 6"></path>
                                                    </svg>
                                                    Previous Image
                                                </a>
                                                }
                                                {(imagePrev == -1) && (data.lsDetail?.idDetailPrev != null) &&
                                                    <a className="cm-button" href={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetailPrev, current)}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 6l-6 6l6 6"></path>
                                                        </svg>
                                                        {data.lsDetail?.nameDetailPrev}
                                                    </a>
                                                }
                                                <div className="cm-dropdown">
                                                    <select onChange={(e)=>OnChangedImageSelect(e)} value={imageSelect}>
                                                        {lsImage && lsImage.map((item: any, index: number) => {
                                                            return <option value={`${index}`}  key={item}>Image {`${(index + 1)}`}</option>
                                                            
                                                       })}

                                                    </select>
                                                </div>
                                                {(imageNext != -1) && <a className="cm-button" onClick={()=>OnNextImage()} style={{ "cursor": "pointer" }}>
                                                    Next Image
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 6l6 6l-6 6"></path>
                                                    </svg>
                                                </a>
                                                }
                                                {(imageNext == -1) && (data.lsDetail?.idDetailNext != null) &&
                                                    <a className="cm-button" href={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetailNext, current)}`}>
                                                        {data.lsDetail?.nameDetailNext}
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 6l6 6l-6 6"></path>
                                                        </svg>
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }

                                {(optionView != "one") && <div className="col-md-12 mt-2 mb-2">
                                    <div className="gray-bg-color border-radius-4 p-3">
                                        <div className="chapter-player-options">
                                            <div className="chapter-player-options-left">
                                                <div className="cm-dropdown">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M5 9.5L7.5 14h-5L5 9.5M3 4h4v4H3V4m2 16a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2M9 5v2h12V5H9m0 14h12v-2H9v2m0-6h12v-2H9v2Z"></path>
                                                        </svg>
                                                    </span>
                                                    <select onChange={(e)=>OnChangedViewMode(e)} value={optionView}>
                                                        {lsviewMode && lsviewMode.map((item: any) => {
                                                            return <option value={`${item.key}`} key={item.key}>{item.value}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" chapter-player-options-right mt-md-3 mt-lg-0">


                                                <Link className="cm-button me-sm-auto js-add-to bookmark-btn" href="/" data-type="subscribe" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"></path>
                                                    </svg>
                                                </Link>

                                                <button className="cm-button red-bg-color pbl-white-color js-report">
                                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3c0-.72.58-1.3 1.3-1.3c.72 0 1.3.58 1.3 1.3c0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path>
                                                    </svg>Report
                                                </button>
                                                {(data.lsDetail?.idDetailPrev != null) &&
                                                    <Link className="cm-button" href={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetailPrev, current)}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M15 6l-6 6l6 6"></path>
                                                        </svg>
                                                        {data.lsDetail?.nameDetailPrev}
                                                    </Link>
                                                }

                                                <div className="cm-dropdown">
                                                    <select onChange={(e) => {OnChangedChapterSelect(e) }} value={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetail, current)}`}>
                                                        {data.chapterList && data.chapterList.map((item: any) => {
                                                            return <option value={`${UrlDetail(item?.idDoc, item.idDetail, current)}`} key={item.idDetail}>{item.nameChapter}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                {(data.lsDetail?.idDetailNext != null) &&
                                                    <Link className="cm-button" href={`${UrlDetail(data.lsDetail?.idDoc,data.lsDetail.idDetailNext, current)}`}>
                                                        {data.lsDetail?.nameDetailNext}
                                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--grommet-icons" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                            <path fill="none" stroke="currentColor" strokeWidth="2" d="M9 6l6 6l-6 6"></path>
                                                        </svg>
                                                    </Link>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}