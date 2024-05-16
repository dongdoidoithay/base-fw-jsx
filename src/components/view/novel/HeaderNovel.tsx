import { UrlInfo } from "@/utils/commons";

export function HeaderNovel({ data, current }: any) {
    return (<>
        <div className="col-md-12 notranslate">
            <div className="section-header mb-2">
                <div className="section-header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path>
                    </svg>
                </div>
                <div className="section-header-title me-auto">
                    <h2 className="max-caracter-2"><a href={`${UrlInfo(data.lsDetail?.idDoc, current)}`} title={`${data.lsDetail?.nameDoc} ${data.lsDetail?.nameChapter}`}>{data?.infoDoc.name}</a></h2>
                    <span>{data?.lsDetail?.nameChapter}</span>
                </div>
            </div>
        </div>
    </>);
}