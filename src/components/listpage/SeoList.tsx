import { BreadcrumbJsonLd, ImageJsonLd, LogoJsonLd, NextSeo, SiteLinksSearchBoxJsonLd, SocialProfileJsonLd } from "next-seo";
import Head from "next/head";
import sample from "lodash/sample";
import { DescSeo, KeyWordSeo, LableMenuName, TitleSeo, TypeDoc, UrlInfo, } from "@/utils/commons";

export function SeoList({ current, name, data }: any) {
    let ItemBreadcrumb: any = [];
    const _title = TitleSeo({ text: name, option: TypeDoc.Genres, current: current, genres: data[0]?.genresName, chapter: "1", auth: data[0]?.authName, desc: data[0]?.desc, nameother: data[0]?.nameOther });
    const _desc = DescSeo({ text: name, option: TypeDoc.Genres, current: current, genres: data[0]?.genresName, chapter: "1", auth: data[0]?.authName, desc: data[0]?.desc, nameother: data[0]?.nameOther });
    const _keyword = KeyWordSeo({ text: name, option: TypeDoc.Genres, current: current, genres: data[0]?.genresName, chapter: "1", auth: data[0]?.authName, desc: data[0]?.desc, nameother: data[0]?.nameOther });


    let _index = 1;
    if (data) {
        ItemBreadcrumb = data?.map((item: any) => {
            let _link = `https://${current.setting?.domain_name}/${UrlInfo(item.idDoc, current)}`;
            _index++;
            return (
                {
                    position: _index,
                    name: LableMenuName(item.key_type, current),
                    item: _link
                }
            )
        });
    }
    return <>
        <Head>
            <title>{_title}</title>
            <link rel="shortcut icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} />
            <link rel="icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} sizes="32x32" />
            <link rel="icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} sizes="192x192" />

            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1, shrink-to-fit=no, user-scalable=yes" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta httpEquiv="content-language" content={current?.setting?.lang_seo} />
            <meta name="sitemap" content={`https://${current?.setting?.domain_name}/${current?.setting?.domain_name}/sitemap-index.xml`}></meta>
            <meta name="robots" content={`https://${current?.setting?.domain_name}/${current?.setting?.domain_name}/robots.txt`}></meta>
        </Head>


        <NextSeo
            title={_title}
            description={_desc}
            openGraph={{
                title: _title,
                description: _desc,
                url: `https://${current?.setting?.domain_name}`,
                type: 'article',
                article: {
                    publishedTime: new Date().toISOString(),
                    modifiedTime: new Date().toISOString(),
                    expirationTime: new Date().toISOString(),
                    section: "News",
                    authors: [
                        `${current.setting?.brand_name}`
                    ],
                    tags: [
                        _keyword
                    ],
                },
                images: [
                    {
                        url: `https://${current?.setting?.domain_name}${current.setting.image_bg}`,
                        alt: current.setting?.brand_name,
                    },
                ],
            }
            }
            additionalMetaTags={[
                {
                    property: "keywords",
                    content: _keyword,
                },
            ]}
            additionalLinkTags={[
                {
                    rel: "alternate",
                    href: `/api/rss.xml`,
                    type: "application/rss+xml",
                },
                {
                    rel: "alternate",
                    href: `/api/ror.xml`,
                    type: "application/rss+xml",
                },
                {
                    rel: "alternate",
                    href: `/api/sitemap.html`,
                    type: "text/html",
                },
                {
                    rel: "alternate",
                    href: `/api/urllist.txt`,
                    type: "text/plain",
                },
                {
                    rel: "alternate",
                    href: `/api/server-sitemap.xml`,
                    type: "application/rss+xml",
                },
            ]}
        />
        <SocialProfileJsonLd
            type="Organization"
            name={sample(current.seo_select?.title).replaceAll('{domain}', current.setting?.brand_name_other).replaceAll('{brand_name}', current.setting?.brand_name)}
            url={`https://${current.setting?.domain_name}`}
            sameAs={[
                'https://www.facebook.com/mun.suny.718',
                'https://www.instagram.com/dproject_manga',
                'https://twitter.com/VnManga'
            ]}
        />
        <BreadcrumbJsonLd
            itemListElements={[
                {
                    position: 1,
                    name: sample(current.seo_select?.title).replaceAll('{domain}', current.setting?.brand_name_other).replaceAll('{brand_name}', current.setting?.brand_name),
                    item: `https://${current.setting?.domain_name}`,
                },
                ...ItemBreadcrumb
            ]}
        />
        {/*   <DefaultSeo {...seo_config?.default} /> */}
        <LogoJsonLd
            logo={`https://${current.setting?.domain_name}/${current.setting?.image_logo}`}
            url={`https://${current.setting?.domain_name}`}
        />
        <ImageJsonLd
            images={[
                {
                    contentUrl: `https://${current.setting?.domain_name}/${current.setting?.image_logo}`,
                    creator: {
                        '@type': 'Person',
                        name: `# ${current.setting?.brand_name_other}`,
                    },
                    creditText: current.setting?.brand_name_other,
                    copyrightNotice: `© ${current.setting?.brand_name_other}`,
                    license: `https://${current.setting?.domain_name}`,
                    acquireLicensePage: `https://${current.setting?.domain_name}`,
                },
            ]}
        />
        <NextSeo
            robotsProps={{
                nosnippet: true,
                notranslate: true,
                noimageindex: true,
                noarchive: true,
                maxSnippet: -1,
                maxImagePreview: 'none',
                maxVideoPreview: -1,
            }}
        />
        <SiteLinksSearchBoxJsonLd
            url={`https://${current.setting?.domain_name}`}
            potentialActions={[
                {
                    target: `/search?q`,
                    queryInput: "search_term_string",
                },
            ]}
        />
    </>
}