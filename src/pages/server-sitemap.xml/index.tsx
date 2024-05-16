import { getServerSideSitemapLegacy } from 'next-sitemap'
///import { GetServerSideProps } from 'next'
import { GetServerSideProps } from 'next';
import { FetchApi, FetchOneApi } from '@/utils/handleApi';
import { currentByDomain, currentKeyType } from '@/utils/currentSetting';
import { Constants } from '@/constants/constants';
import { UrlDetail } from '@/utils/commons';


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const _ct_host = ctx.req.headers.host;

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
    let current: any;

    let _raw_rq = await FetchApi(urls);
    current = currentByDomain(_raw_rq);


    let xmlresult: any = [];

    for (const item of current.Menu) {
        if (item?.child.length > 0) {
            for (const item_child of item.child) 
            {
                const _current = currentKeyType(current, item_child.key_type);
                const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_sitemap_detail}/20/0`;

                let _sitemap = await FetchOneApi(url_site);
                if (_sitemap?.data) {
                    let fields = _sitemap?.data.map((_item: any) => ({
                        loc:`https://${_ct_host}${UrlDetail(_item.idDoc, _item.idDetail, _current)}`,
                        lastmod: new Date().toISOString(),
                        changefreq: 'always',
                        priority: 1
                    }));
                    xmlresult=xmlresult.concat(fields);
                }
            }
        } else {
            const _current = currentKeyType(current, item.key_type);
            const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_sitemap_detail}/20/0`;
            let _sitemap = await FetchOneApi(url_site);
            if (_sitemap?.data) {
                let fields = _sitemap?.data.map((_item: any) => ({
                    loc:`https://${_ct_host}${UrlDetail(_item.idDoc, _item.idDetail, _current)}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'always',
                    priority: 1
                }));
                xmlresult=xmlresult.concat(fields);
            }
        }
    }    
    //console.log("server-sitemap", xmlresult.length);
    return getServerSideSitemapLegacy(ctx, xmlresult);
}

// Default export to prevent next.js errors
export default () => { }