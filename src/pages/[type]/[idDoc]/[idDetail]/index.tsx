import Head from "next/head";
import { currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { BreadcrumbView } from "@/components/view/BreadcrumbView";
import { BlockDetailMangaView } from "@/components/view/BlockDetaiMangaView";
import { GlobalNav } from "@/components/share/GlobalNav";
import { Decrypt, Encrypt } from "@/utils/commons";
import Loadding from "@/components/ui/Loadding";
import { BlockDetailNovelView } from "@/components/view/BlockDetaiNovelView";
import { FooterNav } from "@/components/share/FooterNav";
import { NoDataFound } from "@/components/ui/noDatafound";

export const getServerSideProps = (async (context) => {
    /**Setting Block */
    var _ct_host = context.req.headers.host;
    let domain = "default";
    if (_ct_host && !_ct_host.includes("localhost")) {
        domain = _ct_host.replace("wwww.", "");
    }
    const urls = [
        `${Constants.UrlApp}/api/setting/${domain}`,
        `${Constants.UrlApp}/api/url/${domain}`,
        `${Constants.UrlApp}/api/menu/${domain}`,
        `${Constants.UrlApp}/api/lang/${domain}`,
        `${Constants.UrlApp}/api/seo/${domain}`,
    ];
    let _current: any;
    let _data_info: any;

    const { type, idDoc, idDetail } = context.query;
    //console.log(type,idDoc,idDetail);
    /****
     *  string urlView = $"{Constants.UrlApi}{currentSelect.uri_select.prefix_url_api}{Constants.path_view}/{_idDoc}/{_idDetail}";
 string urlUpView = $"{Constants.UrlApi}{currentSelect.uri_select.prefix_url_api}{Constants.path_view_view}/{idDoc}/{idDetail}";
            
     */
    /***Thong tin phan trang */
    const sort = "ASC";
    const count = 16;
    const page = 0;


    let _raw_rq = await FetchApi(urls);
    _current = currentByTypeUri(_raw_rq, type);

    let _idDoc = ""; let _idDetail = "";
    if (_current &&
        idDoc && idDoc != undefined &&
        idDetail && idDetail != undefined) {
        const start_prefix = _current.uri_select.start_info;
        _idDoc = idDoc.toString().replace(start_prefix, "");
        const start_chapter_prefix = _current.uri_select.start_view;
        _idDetail = idDetail.toString().replace(start_chapter_prefix, "");

        const dataInfos = [
            `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_view}/${_idDoc}/${_idDetail}`,
        ];

        _data_info = await FetchApi(dataInfos);

        const upviews = [
            `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_view_view}/${_idDoc}/${_idDetail}`,
        ];
        await FetchApi(upviews);
    }
    //console.log(_data_info);
    const _st_data = Encrypt(_data_info);
    let repo = {
        current: _current ?? {},
        data: _st_data ?? [],
    };
    //console.log("rp", _data_info);
    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function DetailView({
    repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    let _data_0: any;
    if (repo.data) {
        const _ob_data = Decrypt(repo.data);
        if (_ob_data) {
            _data_0 = _ob_data[0];
        }
    }

    function RenderMode() {
        if (_data_0?.data && _data_0?.data?.infoDoc) {
            //console.log(_data_0?.data);
            switch (_data_0.data.infoDoc.type) {
                case "Manga":
               
                    return <BlockDetailMangaView data={_data_0?.data} current={repo.current} />
                case "Novel":
                    return <BlockDetailNovelView data={_data_0?.data} current={repo.current} />
                 case "Comic":

                    return(<>
                    <Head> <meta name="referrer" content="no-referrer" /></Head>
                      <BlockDetailMangaView data={_data_0?.data} current={repo.current} />
                    </>) 
                default:
                    return <>No Map Data</>
            }

        } else {
            return <Loadding />
        }

    }
    //console.log(_data_0);
    return (
        <>
           
            <GlobalNav current={repo?.current} />
            <BreadcrumbView data={_data_0?.data} current={repo?.current} />
            {RenderMode()}
            {!_data_0 && <NoDataFound/>}
            <FooterNav current={repo?.current}/>
        </>
    );
}
