import { BlockSlide } from "../listpage/blockSlide";
import { BreadcrumbInfo } from "./BreadcrumbInfo";
import { ChapterListView } from "./ChapterListView";
import { InfoView } from "./InfoView";

export function BlockInfoView({ data,dataChapter, current }: any) {
    return (<>
        <BreadcrumbInfo data={data} current={current} />

        <section className="mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xl-9">
                        <div className="row">
                            <InfoView current={current} data={data} />
                            <ChapterListView current={current} dataInfo={data} dataList={dataChapter}/>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3">
                        {/* Slide Bar */}
                        <BlockSlide data={[]} current={current}/>
                    </div>
                </div>
            </div>
        </section>
    </>)
}
