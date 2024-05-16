import { ArticleJsonLd, BreadcrumbJsonLd, ImageJsonLd, LogoJsonLd, NextSeo, SiteLinksSearchBoxJsonLd, SocialProfileJsonLd } from "next-seo";
import Head from "next/head";
import sample from "lodash/sample";
import { DescSeo, KeyWordSeo, TitleSeo, TypeDoc, UrlDetail, UrlInfo, UrlLinkImage, UrlOption } from "@/utils/commons";


export function ViewSeo({ current, data }: any) {
    //console.log(data);
    const _title = TitleSeo({ text: data?.infoDoc.name, option: TypeDoc.View, current: current, genres: data?.infoDoc.genresName, chapter: data?.lsDetail.nameChapter, auth: data?.infoDoc.authName, desc: data?.infoDoc.desc, nameother: data?.infoDoc.nameOther });
    const _desc = DescSeo({ text: data?.infoDoc.name, option: TypeDoc.View, current: current, genres: data?.infoDoc.genresName, chapter: data?.lsDetail.nameChapter, auth: data?.infoDoc.authName, desc: data?.infoDoc.desc, nameother: data?.infoDoc.nameOther });
    const _keyword = KeyWordSeo({ text: data?.infoDoc.name, option: TypeDoc.View, current: current, genres: data?.infoDoc.genresName, chapter: data?.lsDetail.nameChapter, auth: data?.infoDoc.authName, desc: data?.infoDoc.desc, nameother: data?.infoDoc.nameOther });
    const _urlDoc = `https://${current?.setting?.domain_name}${UrlInfo(data?.infoDoc.idDoc, current)}`;

    let ItemBreadcrumb: any = [];
    if (data?.chapterList) {
        ItemBreadcrumb = data?.chapterList?.map((item: any, indx: number) => {
            let _link = `https://${current?.setting?.domain_name}${UrlDetail(item.idDoc, item.idDetail, current)}`;
                return (
                    {
                        position: indx + 2,
                        name: data?.infoDoc.name + ' - ' + item.nameChapter,
                        item: _link
                    }
                )
            }
        );

        //console.log(ItemBreadcrumb);
    }
    return <>
        <Head>
            <title>{_title}</title>
            <link rel="shortcut icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} />
            <link rel="icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} sizes="32x32" />
            <link rel="icon" href={`https://${current?.setting?.domain_name}/${current.setting.image_logo}`} sizes="192x192" />
            <link rel="icon" href={`https://${current?.setting?.domain_name}/icon.gif`} type="image/gif" />
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
            canonical={_urlDoc}

            openGraph={{
                title: _title,
                description: _desc,
                url: _urlDoc,
                type: 'article',
                article: {
                    publishedTime: new Date().toISOString(),
                    modifiedTime: new Date().toISOString(),
                    expirationTime: new Date().toISOString(),
                    section: "News",
                    authors: [
                        data?.infoDoc?.authName && data?.infoDoc.auth.split(',').map((auth: any) => {
                            return (
                                `https://${current?.setting?.domain_name}${UrlOption(auth, TypeDoc.Auth, current)}`
                            )
                        }
                        )
                    ],
                    tags: [
                        _keyword
                    ],
                },
                images: [
                    {
                        url: UrlLinkImage(data?.infoDoc.image),
                        alt: data?.infoDoc.name,
                    },
                ],
            }
            }
            additionalMetaTags={[{
                property: 'keywords',
                content: _keyword
            }]}
            additionalLinkTags={[{
                rel: "alternate",
                href: `https://${current?.setting?.domain_name}/api${UrlDetail(data?.infoDoc.idDoc,data?.lsDetail.idDetail, current)}/feed`,
                type: "application/rss+xml"
              },
              {
                rel: "alternate",
                href: `https://${current?.setting?.domain_name}/api${UrlDetail(data?.infoDoc.idDoc,data?.lsDetail.idDetail, current)}/rss.xml`,
                type: "application/rss+xml"
              }
              ]}
        />
        <BreadcrumbJsonLd
            itemListElements={[
                {
                    position: 1,
                    name: _title,
                    item: _urlDoc,
                },
                ...ItemBreadcrumb
            ]}
        />
        <SocialProfileJsonLd
            type="Organization"
            name={_title}
            url={`https://${current.setting?.domain_name}`}
            sameAs={[
                'https://www.facebook.com/mun.suny.718',
                'https://www.instagram.com/dproject_manga',
                'https://twitter.com/VnManga'
            ]}
        />
        <ArticleJsonLd
            url={`https://${current?.setting?.domain_name}${UrlInfo(data?.infoDoc.idDoc, current)}`}
            title={_title}
            images={[UrlLinkImage(data?.infoDoc.image),]}
            datePublished={new Date().toISOString()}
            dateModified={new Date().toISOString()}
            authorName={data?.infoDoc.authName}
            publisherName={current?.setting?.domain_name}
            publisherLogo={UrlLinkImage(data?.infoDoc.image)}
            description={_desc}
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
    </>
}