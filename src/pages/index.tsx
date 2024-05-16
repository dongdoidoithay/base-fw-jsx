import { currentByDomain } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";
import { LastUpdate } from "@/components/home/lastUpdate";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { TopView } from "@/components/home/topView";
import { GlobalNav } from "@/components/share/GlobalNav";
import { Decrypt, Encrypt } from "@/utils/commons";
import { FooterNav } from "@/components/share/FooterNav";
import { SeoBase } from "@/components/share/SeoBase";
import Ads_Block_Banner from "@/components/ads/Ads_Block_Banner";
import { useRouter } from "next/router";
export const getServerSideProps = (async (context) => {
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

  let _raw_rq = await FetchApi(urls);
  _current = currentByDomain(_raw_rq);

  const dataUrls = [
    `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_topfllow}/6/0`,
    `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/24/0`,
  ];
  _data_rq = await FetchApi(dataUrls);
  const _st_data=Encrypt(_data_rq);
 
  let repo = {
    current: _current ?? {},
    data: _st_data??[],
  };

  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Home({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {


  
let _data_0=[];
let _data_1=[];
if(repo.data){
  const _ob_data=Decrypt(repo.data);
  if(_ob_data){
    _data_0=_ob_data[0].data;
    _data_1=_ob_data[1].data;
  }
}
  //console.log(repo);
  return (
    <>
      <SeoBase current={repo?.current}/>
      <GlobalNav current={repo?.current}/>
      {_data_0 && repo?.current && <TopView data={_data_0} current={repo?.current} />}
      <Ads_Block_Banner current={repo?.current}/>
      {_data_1 && repo?.current && <LastUpdate data={_data_1} current={repo?.current} />}
      <Ads_Block_Banner current={repo?.current}/>
      <FooterNav current={repo?.current}/>
    </>
  );
}
