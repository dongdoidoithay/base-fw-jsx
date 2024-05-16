import Ads_Block_Banner from "@/components/ads/Ads_Block_Banner"

export function NovelConten({ data, current, fontFamilySelect, fontSizeSelect,indexAudio,isPlay }: any) {

    return (<>
        <div className="col-md-12 mt-2 mb-2">
            <div className={`w-100 ${fontFamilySelect} ${fontSizeSelect}`} id="chapterText">
                <Ads_Block_Banner current={current}/>
                {data.lsDetail?.source.split("#").map((item: any,index:number) => {
                    if(index %5==0){
                        if(indexAudio==index && isPlay)
                        {
                            return(
                                <> <p style={{"background":"antiquewhite"}} key={item}>{item}</p>
                                     <Ads_Block_Banner current={current}/>
                                </>  
                            )
                        }
                        else
                            return(
                            <>  <p key={item}>{item}</p>
                                <Ads_Block_Banner current={current}/>
                                </>  
                            )
                    }
                    else{
                        if(indexAudio==index && isPlay)
                        return <p style={{"background":"antiquewhite"}} key={item}>{item}</p>
                        else
                        return <p key={item}>{item}</p>
                    }
                })}
                <Ads_Block_Banner current={current}/>
            </div>
        </div>
    </>)
}