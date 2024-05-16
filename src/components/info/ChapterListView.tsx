import { Constants } from "@/constants/constants";
import { UrlDetail, key_slate } from "@/utils/commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Loadding from "../ui/Loadding";
import { Bounce, Zoom, toast } from "react-toastify";
var md5 = require("md5");

export function ChapterListView({ dataInfo, dataList, current }: any) {
    const [dataChapter, SetDataChapter] = useState([]);
    const [textSearch, setTextSearch] = useState('')
    const [sort, setSort] = useState("ASC");
    const [page, setPage] = useState(0);
    const [hashNext, setHashNext] = useState(false);
    const [hashPrev, setHashPrev] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [loadding, setLoadding] = useState(false);


    const count = 16;
    useEffect(() => {
        setTotalPage(dataList?.totalPage);
        SetDataChapter(dataList.data);
        if (dataList?.totalPage != 0) {
            if (page <= dataList?.totalPage) setHashNext(true);
            if (page > 0) setHashPrev(true);
        }
    }, [])
    //console.log(dataList);
    //console.log(textSearch);
    const FnFindChapter = (input: any) => {
        let _word = input.target.value;
        setTextSearch(_word);
    };
    async function FnSearch() {
        if (textSearch) {
            // Tạo AbortController mới để hủy request cũ
            const abortController = new AbortController();
            abortControllerRef.current = abortController;

            setLoadding(true);
            // Gọi API hoặc logic tìm kiếm ở đây
            fetchResults(abortController.signal);
        }
        else {
            setTotalPage(dataList?.totalPage);
            //if(dataList.data?.length>0)
            SetDataChapter(dataList.data);
            if (dataList?.totalPage != 0) {
                if (page <= dataList?.totalPage) { setHashNext(true); } else { setHashNext(false); }
                if (page > 0) { setHashPrev(true); } else { setHashPrev(false); }
            }
        }
    }

    const abortControllerRef: MutableRefObject<AbortController | null> = useRef(null);
    const fetchResults = async (signal: any) => {
        // Logic fetch data từ API hoặc nguồn khác
        // Sử dụng signal.aborted để kiểm tra nếu request bị hủy
        if (signal.aborted) {
            throw new Error('Request aborted');
        }
        let idChapter = textSearch;
        if (!idChapter)
            idChapter = 'all';
        // Giả lập gọi API bằng Promise
        let url = `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_chapter_list}/${dataInfo?.infoDoc?.idDoc}/${count}/${page}/${idChapter}/${sort}`;
        //console.log(url);
        try {
            const _date = new Date().toUTCString();
            const _headers = {
                'dateRq': _date,
                'ref': url,
                'tranId': md5(_date + url + key_slate),
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
                'Access-Control-Allow-Origin': '*',
            };
            //{ signal,headers }
            const response = await fetch(url, {
                signal,
                ..._headers
            });
            // Kiểm tra nếu request đã bị hủy sau khi gọi API
            if (signal.aborted) {
                setLoadding(false);
                throw new Error('Request aborted');
            }
            //console.log('Call search', url);
            // Xử lý kết quả từ API
            const data = await response.json();
            //console.log(data);
            if (data.data) {
                //console.log(data.data);
                if (data.data?.length > 0)
                    SetDataChapter(data.data);
                //
                setTotalPage(data.totalPage);
                setLoadding(false);
                if (data?.totalPage != 0) {
                    if (page <= data?.totalPage) setHashNext(true);
                    if (page > 0) setHashPrev(true);
                } else {
                    setHashNext(false);
                    setHashPrev(false);
                }
            }
            //return data.results;
        } catch (error) {
            toast(`${error}`,{
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
                });
            setLoadding(false);
            if (error !== 'AbortError') {
                //  console.error('Error fetching results:', error);
            }
        }
    };
    useEffect(() => {
        //console.log("xxxx");
        const delaySearch = setTimeout(() => {
            if (textSearch) {
                // Tạo AbortController mới để hủy request cũ
                const abortController = new AbortController();
                abortControllerRef.current = abortController;

                setLoadding(true);
                // Gọi API hoặc logic tìm kiếm ở đây
                fetchResults(abortController.signal);
            }
            else {
                setTotalPage(dataList?.totalPage);
                SetDataChapter(dataList.data);
                if (dataList?.totalPage != 0) {
                    if (page <= dataList?.totalPage) setHashNext(true);
                    if (page > 0) setHashPrev(true);
                }
            }
        }, 500); // Delay 1 giây

        // Hủy timeout và AbortController cũ khi component unmount hoặc searchTerm thay đổi
        return () => {
            clearTimeout(delaySearch);
            abortControllerRef.current?.abort();
        };
    }, [textSearch]);

    useEffect(() => {
        const fetchData = async () => {
            setLoadding(true);
            const abortController = new AbortController();
            abortControllerRef.current = abortController;
            try {
                await fetchResults(abortController.signal);
            } catch (error) {
                toast(`${error}`,{
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                    });
                if (error !== 'AbortError') {
                    console.error('Error fetching results:', error);
                }
            } finally {
                setLoadding(false);
                const element = document.getElementById("view-tag");
                //element.scrollIntoView();
                element.scrollTop = 0;
            }
        };

        fetchData();
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [sort, page]);

    const FnSortChapter = () => {
        if (sort == "DESC") setSort("ASC");
        if (sort == "ASC")
            setSort("DESC");
        setPage(0);
    };

    async function onPrev() {
        
        if (page > 0) {
            setPage(page - 1);
         
        }
    }
    async function onNext() {
        if (page <= totalPage) {
            setPage(page + 1);
           
        }

    }
    return (<>
        <div className="col-md-12 mt-3 mb-3" id="view-tag">
            <div className="section-header mb-0">
                <div className="section-header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path d="M11 7h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zM20.1 3H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM19 19H5V5h14v14z" fill="currentColor"></path>
                    </svg>
                </div>
                <div className="section-header-title me-auto">
                    <h2 className="max-caracter-2">{current.lable_info.chapter_list}</h2>
                    <span>Input Search Chapter</span>
                </div>
                <div className="section-header-title-right">
                    <div className=" input-group input-group-sm m-2">
                        <input className="form-control" type="text" placeholder={`${current.lable_info.info_search_place}`}
                            value={textSearch} onChange={(e) => FnFindChapter(e)} aria-describedby="inputGroup-sizing-sm" />
                        <button className="input-group-text post-btn" type="submit" onClick={() => FnSearch()}>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z" fill="currentColor"></path>
                            </svg>
                        </button>
                        <button className="input-group-text post-btn" type="submit" onClick={() => FnSortChapter()}>
                            {sort == "ASC" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z" fill="currentColor" /></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" fill="currentColor" /></svg>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-12 mt-2 mb-2">
            <div id="cmtb-0" className="cm-tabs-content  active novels-detail-chapters">
                {loadding && <Loadding />}
                <ul>
                    {dataChapter && dataChapter.map((item: any) => {
                        return (
                            <li key={item.idDetail}>
                                <a title={`${item.nameDoc} | ${item.nameChapter}`}
                                    href={`${UrlDetail(item.idDoc, item.idDetail, current)}`}>
                                    {item.nameChapter}
                                </a>
                                <div className="reading">
                                    <label className="checkbox-label mark-read">
                                        <input type="checkbox" disabled />
                                        <label htmlFor="check0"></label>
                                    </label>
                                </div>
                            </li>
                        )
                    })}

                </ul>
                {loadding && <Loadding />}
            </div>
        </div>
        <div className="row  justify-content-around">
            <div className="col">
                {hashPrev && <button className="col-12 btn btn-outline-danger" type="button" onClick={() => onPrev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24" ><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="currentColor" /></svg>
                    {current.lable_info.info_prev}
                </button>
                }
                {!hashPrev && <button className="col-12 btn btn-outline-dark" type="button" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="currentColor" /></svg>
                    {current.lable_info.info_prev}
                </button>
                }
            </div>
            <div className="col">
                {hashNext && <button className="col-12 btn btn-outline-danger" type="submit" onClick={() => onNext()}>
                    {current.lable_info.info_next}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24" ><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                </button>
                }
                {!hashNext && <button className="col-12 btn btn-outline-dark" type="button" disabled>
                    {current.lable_info.info_next}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                </button>
                }
            </div>

        </div>
        {/* <div className="toast-container">
            <div className="position-fixed bottom-0 end-0" >
                <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true"  data-bs-delay="100" data-bs-autohide="true" data-bs-animation="true">
                    <div className="toast-header">

                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Hello, world! This is a toast message.
                    </div>
                </div>
            </div>
        </div> */}
    </>)
}