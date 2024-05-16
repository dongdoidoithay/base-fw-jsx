import { TitleShow, TypeDoc, UrlInfo } from "@/utils/commons"
import LazyImage from "../ui/ImageLazy"

export function ListItem({ data, current, modeView }: any) {
    return (<>
        <div className={`category-items ${modeView}`}>
            <ul>
                {data && data.map((item: any) => {
                    return (
                        <li key={item.idDoc}>
                            <div className="category-name">
                                <a href={`${UrlInfo(item.idDoc, current)}`} title={item.name}>
                                    {item.name}
                                </a>
                            </div>
                            <div className="category-feature">
                                <div className="category-img">
                                    <div className="category-item-score">9.9</div>
                                    <a href={`${UrlInfo(item.idDoc, current)}`} title={item.name}>
                                        <LazyImage src={item.image} srcSet={item.image} title={item.name} />
                                    </a>
                                </div>
                                <div className="category-feature-content">
                                    <div className="category-feature-content-text">
                                        <a href={`${UrlInfo(item.idDoc, current)}`} title={item.name}>
                                            <span className="max-caracter-2">
                                                {item.nameOther}
                                            </span>
                                            <span className="max-caracter-2">
                                                {item.desc}
                                            </span>
                                        </a>
                                    </div>
                                    <ul>
                                        <li>
                                            <strong>{current.lable_info.info_status}:</strong>
                                            <span>{item.statusName}</span>
                                        </li>
                                        <li>
                                            <strong>{current.lable_info.info_genres}:</strong>
                                            <span>{item.genresName}</span>
                                        </li>
                                        <li>
                                            <strong>{current.lable_info.info_auth}:</strong>
                                            <span>{item.authName}</span>
                                        </li>
                                        <li>
                                            <strong>{current.lable_info.info_view}:</strong>
                                            <span>{item.view}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-v-status"><a href={`${UrlInfo(item.idDoc, current)}`} title={item.name}>{item.statusName}</a></div>
                            <div className="category-bottom">
                                <div className="category-bottom-buttons">
                                    <a className="add-collection js-add-to" >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" fill="currentColor"></path>
                                        </svg>
                                        Add to Collection
                                    </a>
                                    <a className="add-subs js-add-to bookmark-btn"  >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 0 1 2-2a2 2 0 0 1 2 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2" fill="currentColor"></path>
                                        </svg>
                                        Bookmark
                                    </a>
                                    <a className="add-favs js-add-to" >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" fill="currentColor"></path>
                                        </svg>
                                        Add to Favs
                                    </a>
                                    <a className="full-chapter" href={`${UrlInfo(item.idDoc,current)}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" fill="currentColor"></path>
                                        </svg>
                                        Full Chapter List
                                    </a>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </>)
}