import Head from "next/head";
import Image from "next/image";
import { currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";
import { LastUpdate } from "@/components/home/lastUpdate";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { TopView } from "@/components/home/topView";
import { GlobalNav } from "@/components/share/GlobalNav";
import { FooterNav } from "@/components/share/FooterNav";
import { NoDataFound } from "@/components/ui/noDatafound";
import { SeoBase } from "@/components/share/SeoBase";
import Ads_Block_Banner from "@/components/ads/Ads_Block_Banner";

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
  let _data_rq: any;
 // console.log(context.query);

  const { type } = context.query;

  if (!type.includes('.')) {
    let _raw_rq = await FetchApi(urls);
    _current = currentByTypeUri(_raw_rq, type);

    if (_current) {
      const dataUrls = [
        `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_topfllow}/6/0`,
        `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/24/0`,
      ];
      _data_rq = await FetchApi(dataUrls);
    }
  }
  let repo = {
    current: _current ?? null,
    data: _data_rq ?? [],
  };
  //console.log("rp", _data_rq);
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Type({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  //console.log(repo);
  return (
    <>
      {repo.current  &&
        <>
          <SeoBase current={repo?.current} />
          <GlobalNav current={repo?.current} />
          {/* xử lý khi repo.data.length<=0 */}
          {repo.data.length <= 0 && <NoDataFound />}
          {repo.data[0]?.data && repo?.current && <TopView data={repo.data[0]?.data} current={repo?.current} />}
          <Ads_Block_Banner current={repo?.current}/>
          {repo.data[1]?.data && repo?.current && <LastUpdate data={repo.data[1]?.data} current={repo?.current} />}
          <Ads_Block_Banner current={repo?.current}/>
          <FooterNav current={repo?.current} />
        </>
      }
    </>
  );
}
