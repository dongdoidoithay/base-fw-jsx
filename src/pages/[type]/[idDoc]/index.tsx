import Head from "next/head";
import { currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { BlockInfoView } from "@/components/info/BlockInfoView";
import Loadding from "@/components/ui/Loadding";
import { BlockInfoAnime } from "@/components/info/BlockInfoAnime";
import { Decrypt, Encrypt } from "@/utils/commons";
import { GlobalNav } from "@/components/share/GlobalNav";
import { FooterNav } from "@/components/share/FooterNav";
import { NoDataFound } from "@/components/ui/noDatafound";
import { InfoSeo } from "@/components/info/infoSeo";

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

  const { type, idDoc } = context.query;
  //console.log(type);

  /***Thong tin phan trang */
  const sort = "ASC";
  const count = 16;
  const page = 0;

  if (!type.includes('.') && !idDoc.includes('.gif') && !idDoc.includes('.png') && !idDoc.includes('.svg')) 
  {
    let _raw_rq = await FetchApi(urls);
    _current = currentByTypeUri(_raw_rq, type);

    let _idDoc = "";
    if (_current && idDoc && idDoc != undefined) {
      const start_prefix = _current.uri_select.start_info;
      const end_prefix = _current.uri_select.end_info
      _idDoc = idDoc.toString().replace(start_prefix, "").replace(end_prefix, "");

      const dataInfos = [
        `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_info}/${_idDoc}`,
        `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_chapter_list}/${_idDoc}/${count}/${page}/all/${sort}`,
      ];

      _data_info = await FetchApi(dataInfos);
    }
//console.log(_data_info);
    const _st_data = Encrypt(_data_info);
    let repo = {
      current: _current ?? null,
      data: _st_data ?? [],
    };
    
    return { props: { repo } }
  } else {
    let repo = {
      current: _current ?? null,
      data: [],
    };
    return { props: { repo } }
  }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Info({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let _data_0: any = [];
  let _data_1: any = [];
  function RenderMode() {

    if (repo.data) {
      const _ob_data = Decrypt(repo.data);
      if (_ob_data) {
        _data_0 = _ob_data[0];
        _data_1 = _ob_data[1];
      }
    }
    // console.log(_info);
    if (_data_0.data && _data_0.data.infoDoc && repo.current) {
      switch (_data_0.data.infoDoc.type) {
        case "Manga":
        case "Novel":
        case "Comic":
          return (<>
            <InfoSeo current={repo?.current} data={_data_0?.data} dataChapter={_data_1} />
            <BlockInfoView data={_data_0?.data} current={repo?.current} dataChapter={_data_1} />
          </>)

        case "Anime":
          return (<>
            <InfoSeo current={repo?.current} data={_data_0?.data} dataChapter={_data_1} />
            <BlockInfoAnime data={_data_0?.data} current={repo?.current} dataChapter={_data_1.data} />
          </>)
        default:
          return <>No Map Data</>
      }
    }
    return <Loadding />

  }

  return (
    <>

      <GlobalNav current={repo?.current} />
      {RenderMode()}
      {/* xử lý khi repo.data.length<=0 */}
      {_data_0.length <= 0 && <NoDataFound />}
      {/*   {repo.data[0]?.data && repo?.current && <BlockInfoView data={repo.data[0]?.data} current={repo?.current} dataChapter={repo.data[1].data}/>} */}
      <FooterNav current={repo?.current} />
    </>
  );
}
