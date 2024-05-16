import { FomatDate } from "@/utils/caldate";
import { UrlInfo, TitleShow, TypeDoc, UrlDetail } from "@/utils/commons";
import LazyImage from "@/components/ui/ImageLazy";
import Loadding from "@/components/ui/Loadding";

export function TopView({ data, current }: any) {

    return (
        <>
         <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-header">
                                <div className="section-header-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" style={{ "transform": "rotate(360deg)" }}>
                                        <path fill="currentColor" d="M432.9 0H107.1C94.3 0 83.8 10.4 83.8 23.3V512L270 325.8L456.2 512V23.3c0-12.9-10.4-23.3-23.3-23.3zm-46.5 186.2h-93.1v93.1h-46.5v-93.1h-93.1v-46.5h93.1V46.5h46.5v93.1h93.1v46.6z" />
                                    </svg>
                                </div>
                                <div className="section-header-title me-auto">
                                    <h2 className="max-caracter-2">{current.lable_info.info_popular} {current.uri_select.name_type}</h2>
                                    <span>Popular manga or Anime , Novels, Comics</span>
                                </div>
                                <a href={`/${current.uri_select.key_uri}/popular`} className="section-header-button">{current.lable_info.lable_action_view_more}</a>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {!data && <Loadding />}
                                {data && data.map((item: any) => {
                                    return (
                                        <div className="col-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 mb-3" key={item.idDoc}>
                                            <div className="card-v">
                                                <div className="card-v-image">
                                                    <div className="card-v-image-score">{item.view}</div>
                                                    <a href={`${UrlInfo(item.idDoc, current)}`}
                                                        title={`${TitleShow(item.name, TypeDoc.Info, current, "1", item.nameOther, "", item.authName, item.desc, item.nameOther)}`}
                                                    >
                                                        <LazyImage src={item.image} srcSet={item.image} title={item.name} />
                                                    </a>
                                                </div>
                                                <div className="card-v-status d-none">
                                                    <a href={`${UrlInfo(item.idDoc, current)}`}
                                                        title={`${TitleShow(item.name, TypeDoc.Info, current, "1", item.nameOther, "", item.authName, item.desc, item.nameOther)}`}
                                                    >
                                                        {item.statusName}
                                                    </a>
                                                </div>
                                                <div className="card-v-name max-caracter-1">
                                                    <a href={`${UrlInfo(item.idDoc, current)}`}
                                                        title={`${TitleShow(item.name, TypeDoc.Info, current, "1", item.nameOther, "", item.authName, item.desc, item.nameOther)}`}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
