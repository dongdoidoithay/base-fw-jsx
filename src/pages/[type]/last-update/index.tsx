import Head from "next/head";
import Image from "next/image";
import {  currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { TopView } from "@/components/home/topView";
import { GlobalNav } from "@/components/share/GlobalNav";
import { BlockList } from "@/components/listpage/blockList";
import { FooterNav } from "@/components/share/FooterNav";
import { NoDataFound } from "@/components/ui/noDatafound";
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

  const {type} =context.query;

  let _raw_rq = await FetchApi(urls);
  _current = currentByTypeUri(_raw_rq,type);

  //const _name = _current.uri_select.name_type;
  
  const dataUrls = [
    `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/24/0`,
  ];
  _data_rq = await FetchApi(dataUrls);

  let repo = {
    current: _current ?? {},
    data: _data_rq ?? [],
  };
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function LastUpdate({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const path= `${Constants.UrlApi}${repo?.current.uri_select.prefix_url_api}${Constants.path_home_update}/24`;
  //console.log(repo);
  return (
    <>
      <GlobalNav current={repo?.current}/>
            {/* xử lý khi repo.data.length<=0 */}
            {repo.data.length<=0 && <NoDataFound/>}
       <Ads_Block_Banner current={repo?.current}/>
      <BlockList current={repo?.current} data={repo?.data} name={repo?.current?.uri_select.name_type} path={path}/>
      <Ads_Block_Banner current={repo?.current}/>
      <FooterNav current={repo?.current}/>
    </>
  );
}
