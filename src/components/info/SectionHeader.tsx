import { UrlInfo, TitleShow, TypeDoc, UrlDetail } from "@/utils/commons";

export function SectionHeader({ data, current }: any) {

    return (<>
        <div className="col-md-12">
            <div className="section-header mb-2">
                <div className="section-header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" style={{"transform": "rotate(360deg)"}}>
                        <path fill="currentColor" d="M512 124.7L256 18L0 124.7l256 106.7l256-106.7zM256 274l-144.9-67.6L0 252.7l256 106.7l256-106.7l-111.1-46.3L256 274zm0 128l-139.6-69.8L0 380.7l256 106.7l256-106.7l-116.4-48.5L256 402z" />
                    </svg>
                </div>
                <div className="section-header-title me-auto">
                    <h2 className="max-caracter-2"><a href={`${UrlInfo(data.idDoc, current)}`} title={`${TitleShow(data.name, TypeDoc.Info, current, "1", data.nameOther, "", data.authName, data.desc, data.nameOther)}`}>{current.lable_select.start_manga} {data?.name}</a></h2>
                </div>
            </div>
        </div>
    </>)
}