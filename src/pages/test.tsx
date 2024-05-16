import { currentByDomain } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";
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
import { useEffect, useState } from "react";
export const getServerSideProps = (async (context) => {
  var _ct_host = context.req.headers.host;
  let domain = "default";
  if (_ct_host && !_ct_host.includes("localhost")) {
    domain = _ct_host.replace("wwww.", "");
  }

  let repo = {
    domain: domain
  };

  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Home({
  repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const [current, setCurrent] = useState(null);
  const [prevRepo, setPrevRepo] = useState(null);
  useEffect(() => {
    if (!current || repo !== prevRepo) {
      getCurrent();
      setPrevRepo(repo);
    }
    
    console.log(current);
  }, [current, repo]);
  const getCurrent = async () => {
    const urls = [
      `${Constants.UrlApp}/api/setting/${repo.domain}`,
      `${Constants.UrlApp}/api/url/${repo.domain}`,
      `${Constants.UrlApp}/api/menu/${repo.domain}`,
      `${Constants.UrlApp}/api/lang/${repo.domain}`,
      `${Constants.UrlApp}/api/seo/${repo.domain}`,
    ];

    const _raw_rq = await FetchApi(urls);
    const _current = currentByDomain(_raw_rq);
   
    setCurrent(_current);
  }
  useEffect(()=>{
    getData();
  },[current])
const getData = async () => {
  console.log('xxx',current);
  if (current) {
    const dataUrls = [
      `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_home_topfllow}/6/0`,
      `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_home_update}/24/0`,
    ];
    const _data_rq = await FetchApi(dataUrls);
    console.log(_data_rq);
  }
}

  return (
    <>

    </>
  );
}
