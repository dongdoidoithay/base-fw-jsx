import { MutableRefObject, useEffect, useRef, useState } from "react"
import { HeaderList } from "./headerList"
import { ListItem } from "./listItem"
import { Zoom, toast } from "react-toastify";
import { Constants } from "@/constants/constants";
import { key_slate } from "@/utils/commons";
import Loadding from "../ui/Loadding";
import { BlockSlide } from "./blockSlide";
import { SeoList } from "./SeoList";
var md5 = require("md5");

export function BlockList({ data, current,name,path }: any) {
    const[dataList,setDataList]=useState(data[0].data);
    useEffect(()=>{
        if(data && data.length>0){
            setTotalRecode(data[0].totalRecode);
            setTotalPage(data[0].totalPage)
            if(data[0].totalPage>0){
                setHashNext(true);
            }
        }
    },[])
    const [hashPrev, setHashPrev] = useState(false);
    const [hashNext, setHashNext] = useState(false);
    const [modeView, setModeView] = useState('cm-list');
    const [totalRecode,setTotalRecode]=useState(0);
    const [totalPage,setTotalPage]=useState(0);
    const [page,setPage]=useState(0);
    const [loadding, setLoadding] = useState(false);
    


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
            }
        };
        if(page>0){
            fetchData();
        }
        else{
            setDataList(data[0].data);
            if(data && data.length>0){
                setTotalRecode(data[0].totalRecode);
                setTotalPage(data[0].totalPage)
                if(data[0].totalPage>0){
                    setHashNext(true);
                }
            }
        }
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [ page]);
    const abortControllerRef: MutableRefObject<AbortController | null> = useRef(null);
    const fetchResults = async (signal: any) => {
        // Logic fetch data từ API hoặc nguồn khác
        // Sử dụng signal.aborted để kiểm tra nếu request bị hủy
        if (signal.aborted) {
            throw new Error('Request aborted');
        }
   
        // Giả lập gọi API bằng Promise
        //let url = `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_home_update}/24/${page}`;
        let url=`${path}/${page}`
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
           // console.log(data);
            if (data.data) {
                //console.log(data.data);
                if (data.data?.length > 0)
                    setDataList(data.data);
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
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
    return (
        <>
            <SeoList name={name} current={current} data={dataList}/>
            <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <div className="row">
                                <div className="col-md-12">
                                    <HeaderList current={current}
                                        name={name}
                                        totalRecode={totalRecode}
                                        setModeView={setModeView}
                                        modeView={modeView} />
                                </div>
                                <div className="col-md-12 mt-2 mb-2">

                                    <ListItem current={current}
                                        data={dataList}
                                        modeView={modeView} />
                                </div>
                                <div className="col-md-12">
                                    <div className="row justify-content-around">
                                    {loadding && <Loadding />}
                                        <div className="col">

                                            {hashPrev && <button className="col-12 btn btn-outline-danger" type="submit" onClick={() => onPrev()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="currentColor" /></svg>
                                                {current?.lable_info.info_prev}
                                            </button>}
                                            {!hashPrev && <button className="col-12 btn btn-outline-dark" type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="currentColor" /></svg>
                                                {current?.lable_info.info_prev}
                                            </button>}
                                        </div>
                                        <div className="col">
                                            {hashNext && <button className="col-12 btn btn-outline-danger" type="submit" onClick={() => onNext()}>
                                                {current?.lable_info.info_next}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                            </button>
                                            }
                                            {!hashNext && <button className="col-12 btn btn-outline-dark" type="button" disabled>
                                                {current?.lable_info.info_next}
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                            </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            {/* cate */}
                            <BlockSlide data={[]} current={current}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}