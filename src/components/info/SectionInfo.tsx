import { UrlInfo, TitleShow, TypeDoc, UrlDetail } from "@/utils/commons";
import LazyImage from "@/components/ui/ImageLazy";
import { FomatDateCutual } from "@/utils/caldate";

export function SectionInfo({ data, current }: any) {
    return (
        <>
            <div className="col-md-12 mt-2 mb-2">
                <div className="novels-detail">
                    <div className="novels-detail-left">
                        <LazyImage src={data?.infoDoc.image} srcSet={data?.infoDoc.image} title={data?.infoDoc.name} />
                    </div>
                    <div className="novels-detail-right">
                        <ul>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_name_other}:</div>
                                <div className="novels-detail-right-in-right"><span>{data?.infoDoc.nameOther}</span></div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_status}:</div>
                                <div className="novels-detail-right-in-right">{data?.infoDoc.statusName}</div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_genres}:</div>
                                <div className="novels-detail-right-in-right">
                                    {data?.infoDoc.genresName}
                                    {/*  <a href="https://rmanga.app/genre/action" className="box">Action</a>  */}
                                </div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_year}:</div>
                                <div className="novels-detail-right-in-right"><span className="red-color"><strong>{data?.infoDoc.year} </strong></span></div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_type}:</div>
                                <div className="novels-detail-right-in-right"><span className="red-color"><strong>{data?.infoDoc.typeName} </strong></span></div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_auth}:</div>
                                <div className="novels-detail-right-in-right">
                                    {data?.infoDoc.authName}
                                    {/* <a href="https://rmanga.app/author/mukai-natsumi">Mukai Natsumi</a>  */}
                                </div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_date}:</div>
                                <div className="novels-detail-right-in-right">
                                    {FomatDateCutual(data.infoDoc.date, current)}
                                </div>
                            </li>
                            <li>
                                <div className="novels-detail-right-in-left">{current.lable_info.info_view}:</div>
                                <div className="novels-detail-right-in-right">{data?.infoDoc.view}</div>
                            </li>
                            {/*  <li>
                        <div className="novels-detail-right-in-left">Latest Chapters:</div>
                        <div className="novels-detail-right-in-right">
                            <a href="https://rmanga.app/13/chapter-56/all-pages" className="box"> CH 56</a>
                        </div>
                    </li>  */}
                            {/*  <li>
                        <div className="novels-detail-right-in-left">
                            <div className="js-star-rating pt-1" data-novel-id="13" data-score="12"></div>

                            <div className="novels-detail-stars"> </div>
                        </div>
                        <div className="novels-detail-right-in-right">
                            <span className="blue-color me-2"><strong>12</strong></span>
                            <span className="box">2 votes</span>
                        </div>
                    </li>  */}
                            <li>
                                <div className="novels-detail-buttons">
                                    <a className="novels-detail-buttons-collection js-add-to">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" fill="currentColor"></path>
                                        </svg>
                                        <span>{current.lable_info.info_add_collection}</span>
                                    </a>
                                    <a className="novels-detail-buttons-subscribe js-add-to bookmark-btn" >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="currentColor"></path>
                                        </svg>
                                        <span>{current.lable_info.info_add_action}</span>
                                    </a>
                                    <a className="novels-detail-buttons-bookmark js-add-to" >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"></path>
                                        </svg>
                                        <span>{current.lable_info.info_favor}</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* tags */}
            <div className="col-md-12 mt-3 mb-3">
                <div className="empty-box gray-bg-color border-radius-4 p-3">
                    Tags:
                </div>
            </div>

            {/* Descripption */}

            <div className="col-md-12 mt-3 mb-3">
                <div className="section-header mb-0">
                    <div className="section-header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--fluent" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                            <g fill="none">
                                <path d="M2.75 4.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75zm0 3a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75zM2 11.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </div>
                    <div className="section-header-title me-auto">
                        <h2 className="max-caracter-2">{current.lable_info.info_summary}</h2>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-3">
                <div className="empty-box">
                    {data?.infoDoc.desc}
                </div>
            </div>
        </>
    )
}