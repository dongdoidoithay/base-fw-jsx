import { useEffect, useState } from "react";
import { BreadcrumbInfo } from "./BreadcrumbInfo";
import { ChapterListView } from "./ChapterListView";
import { InfoView } from "./InfoView";
import { SectionInfo } from "./SectionInfo";
import Loadding from "../ui/Loadding";

export function BlockInfoAnime({ data, dataChapter, current }: any) {
    //console.log(data);
    //console.log(dataChapter);
    const [src, setSrc] = useState('');
    //const [isLoadding,setIsLoadding]=useState(true);
    useEffect(() => {
        if (dataChapter.length > 0 && !src){
        
            setSrc(dataChapter[0].source)
            //setIsLoadding(false);
        }
    }, [src,setSrc]);
    function ChangeEP(src: any) {
        //setSrc('/image-place.gif');
        //setIsLoadding(true);
        setSrc(src);
        //setIsLoadding(false);
    }
    return (<>
        <BreadcrumbInfo data={data} current={current} />

        <section className="mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-9">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-header mb-2">
                                    <div className="section-header-icon">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" style={{"transform": "rotate(360deg)"}}>
                                            <path fill="currentColor" d="M512 124.7L256 18L0 124.7l256 106.7l256-106.7zM256 274l-144.9-67.6L0 252.7l256 106.7l256-106.7l-111.1-46.3L256 274zm0 128l-139.6-69.8L0 380.7l256 106.7l256-106.7l-116.4-48.5L256 402z" />
                                        </svg>
                                    </div>
                                    <div className="section-header-title me-auto">
                                        <h2 className="max-caracter-2">{current.lable_select.start_manga} {data?.infoDoc.name}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-2 mb-2">
                                <div className="novels-detail">
                                   {/*  {isLoadding && <Loadding/>} */}
                                    <iframe style={{ "minHeight": "600px", "minWidth": "100%" }} src={src} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} frameBorder={0} marginWidth={0} marginHeight={0} scrolling="no" height="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3">
                        <div className="side-bars notranslate">
                            <h2 style={{ "textTransform": "uppercase" }}>{current.lable_info.lable_List} {current.lable_select.start_chapter}</h2>
                            <div className="row">
                                {dataChapter && dataChapter.map((item: any, index: number) => {
                                    const name = item.nameChapter?.includes("EP") ? item.nameChapter : `EP ${item.nameChapter}`;
                                    const isActive = item.source == src?true:false;
                                    return (
                                        <>
                                            <div className="side-bars-item" key={item}>
                                                <div className="side-bars-left">
                                                    <div className="side-bars-score">
                                                        <a onClick={() => ChangeEP(item.source)} style={{ "color": "white", "cursor": "pointer" }}>
                                                            {index + 1}
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="side-bars-right">
                                                    <div className="side-bars-name max-caracter-1">
                                                        <a onClick={() => ChangeEP(item.source)} style={{ "cursor": "pointer" }}>
                                                            {name}
                                                        </a>
                                                    </div>
                                                    {isActive && <div className="side-bars-prgres">
                                                        <div className="side-bars-progres-bar-line" style={{ "width": "80%" }}></div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-xl-9">
                    <SectionInfo data={data} current={current} />
                        {/*    <AnimeView current="@current" data="@dataInfo" />
                    <Disqus current="@current" /> */}
                    </div>
                    <div className="col-12 col-xl-3">
                        {/*   <Slidebar/> */}
                    </div>
                </div>
            </div>
        </section>

    </>)
}
