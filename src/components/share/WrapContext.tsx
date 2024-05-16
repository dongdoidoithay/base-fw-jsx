import { currentByDomain } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { CurrentsContext, CurrentsContextProvider } from "@/context/current";

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
    let _raw_rq = await FetchApi(urls);
    _current = currentByDomain(_raw_rq);


    let repo = {
        current: _current ?? {}
    };
    //const repo_data=Encrypt(repo);
    //console.log("rp", repo);
    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function WrapContext({ children, repo }: { children: React.ReactNode; repo: InferGetServerSidePropsType<typeof getServerSideProps> }) {
    return (
        <CurrentsContextProvider>
            {children}
        </CurrentsContextProvider>
    );
}
