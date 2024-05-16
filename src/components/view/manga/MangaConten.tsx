import Ads_Block_Banner from "@/components/ads/Ads_Block_Banner";
import LazyImage from "@/components/ui/ImageLazy";
import ImageLoading from "@/components/ui/ImageLoadding";
import Image from "next/image";
import { useState } from "react";

export function MangaConten({ data, current, optionView,
    imageNext, setImageNext,
    imagePrev, setImagePrev,
    imageSelect, setImageSelect
}: any) {
    /* const[imageShow,setImageShow]=useState('http://localhost:7777/image-place.gif');
    useEffect(()=>{
        setImageShow(_source[imageSelect]);
    },[]) */

    let _source: any = [];
    if (data) {
        _source = data.lsDetail?.source?.split("#");
    }
    function _renderAllImage() {
        return (<>
            {_source && _source.map((item: any, indx: number) => {
                if(indx==4)
                {
                        return (<>
                                    <Ads_Block_Banner current={current}/>
                                    <LazyImage src={item} srcSet={item} title={data.lsDetail?.nameDoc + '-' + data.lsDetail?.nameChapter + '-' + indx} key={indx} style={{ "width": "100%", "height": "auto" }} />
                                </>)
                }
                if(indx % 5==0)
                {
                    return(<>
                                <LazyImage src={item} srcSet={item} title={data.lsDetail?.nameDoc + '-' + data.lsDetail?.nameChapter + '-' + indx} key={indx} style={{ "width": "100%", "height": "auto" }} />
                                <Ads_Block_Banner current={current}/>
                            </> 
                            )
                 }
                 else
                 {
                    return <LazyImage src={item} srcSet={item} title={data.lsDetail?.nameDoc + '-' + data.lsDetail?.nameChapter + '-' + indx} key={indx} style={{ "width": "100%", "height": "auto" }} />
                 }
            })}
             <Ads_Block_Banner current={current}/>
        </>);
    }
    function _renderOneImage() {
        let ImageSelect = _source[imageSelect];
        let imagenext= _source[imageSelect+1];
        ///console.log(imagenext);

        return (
            <>
          
              <ImageLoading url={ImageSelect} title={`${data.nameDoc}-${data.lsDetail?.nameChapter}${imageSelect}`} classStyle="w-100 h-100 object-fill"  style={{"width":"100%","height":"auto"}}/>
               {imagenext &&<img style={{"display":"none"}} src={imagenext} alt="Image preload" width={10} height={10} />}
                {/* <LazyImage src={ImageSelect} srcSet={ImageSelect} title={`${data.lsDetail?.nameDoc}-${data.lsDetail?.nameChapter}-${imageSelect}`} style={{ "width": "100%", "height": "auto" }}/> */}
                <a title='prev Img' style={{ "cursor": "url('/pre.cur'), auto", "zIndex": "50" }} className="position-absolute h-100 start-0 w-50" onClick={() => OnPrevImage()} ></a>
                <a title='next Img' style={{ "cursor": "url('/next.cur'), auto", "zIndex": "50" }} className="position-absolute h-100 start-50 w-50" onClick={() => OnNextImage()} ></a>
               
            </>
        )
    }
    function OnNextImage() {
        //setImageShow('http://localhost:7777/image-place.gif');
        if (imageSelect < _source.length - 1) {
            setImageSelect(imageSelect + 1);
            if (imageSelect + 1 < _source.length - 1) {
                setImageNext(imageSelect + 2);
            }
            setImagePrev(imageSelect - 1);
        }
        else {
            setImageNext(-1);
            setImageSelect(0);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        //setImageShow(_source[imageSelect]);
    }
    function OnPrevImage() {
       // setImageShow('http://localhost:7777/image-place.gif');
        if (imageSelect - 1 > 0) {
            setImageSelect(imageSelect - 1);
            setImageNext(imageSelect);
            if (imageSelect - 2 > 0) {
                setImagePrev(imagePrev - 2);
            }
        }
        else {
            setImagePrev(-1);
            setImageSelect(0);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        //setImageShow(_source[imageSelect]);
    }
    return (
        <>
            <section className="mt-4 cm-mbl-p-m">
                <div className="container cm-mbl-p-m">
                    <div className="row cm-mbl-p-m">
                        <div className="mt-2 mb-2 cm-mbl-p-m" style={{ "backgroundColor": "#0d0d0d2e" }}>
                            {optionView == "one" ?
                                <div className="chapter-detail-novel-big-image text-center position-relative">
                                    <Ads_Block_Banner current={current}/>
                                    {data && (optionView == "one") && _renderOneImage()}
                                    <Ads_Block_Banner current={current}/>
                                </div> :
                                <div className="chapter-detail-novel-big-image text-center">
                                     <Ads_Block_Banner current={current}/>
                                    {data && (optionView == "all-pages") && _renderAllImage()}
                                    <Ads_Block_Banner current={current}/>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}