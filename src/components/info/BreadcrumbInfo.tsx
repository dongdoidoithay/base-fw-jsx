import { TypeDoc, UrlCurrentType, UrlOption } from "@/utils/commons";
import Link from "next/link";


export function BreadcrumbInfo({ data,current }: any) {
    let key_genres='';
    let name_genres='';
    if(data){
        const _genresls=data?.infoDoc.genres?.split(",");
        const _genresNamels=data?.infoDoc.genresName?.split(",");
        if(_genresls && _genresNamels){
            key_genres=_genresls[0];
            name_genres=_genresNamels[0];
        }
    }
    return (
        <>
            <section className="mt-4 notranslate">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cm-breadcrumb">
                                <ul>
                                    <li>
                                        <Link href="/">
                                            <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path>
                                            </svg>
                                            <span>{current?.lable_info?.info_home}</span>
                                        </Link>
                                    </li>
                                    <li><a href={`${UrlCurrentType(current)}`} className="">{current?.lable_info?.info_genres}</a></li>
                                <li><a href={`${UrlOption(key_genres,TypeDoc.Genres,current)}`} className="">{name_genres}</a></li>
                                <li className="">{data?.infoDoc?.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section >
        </>
    )
}