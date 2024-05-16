/* eslint-disable react/jsx-no-undef */
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { LableMenuName, UrlByKeyType } from "@/utils/commons"
import Link from "next/link"
import { useRef, useState } from "react";
import { QuickSearch } from "./QuickSearch";
import Analytics from "../ads/Analytics";
import Ads_Block_PopUp from "../ads/Ads_Block_PopUp";
import Ads_Block_Banner from "../ads/Ads_Block_Banner";
import Ads_AdsPubfuture_Sticky from "../ads/Ads_AdsPubfuture_Sticky";

export function GlobalNav({ current }: any) {
    const [classShow, setClassShow] = useState('');
    const [navMenuCssClass,setNavMenuCssClass]=useState('')
    const ref = useRef<HTMLUListElement>(null);
    useOnClickOutside(ref, () => setChildActive(""));

    function ToggleNavMenu() {
        const _navMenuCssClass = navMenuCssClass == "active" ? '' : "active";
        setNavMenuCssClass(_navMenuCssClass);
    }
    function ToggleSearch() {
        const _classShow = classShow == "active" ? '' : "active";
        //console.log(_classShow);
        setClassShow(_classShow);
    }
    const [childActive, setChildActive] = useState("");
    function ClassChild(id: any, count: any) {
        if (childActive == id && count > 0)
            return "selected";
        else
            return null;
    }
    function ToggleChildActive(idChild: any) 
    {
        if (idChild == childActive)
            setChildActive("");
        else
            setChildActive(idChild);
    }

    return (
        <>
            <header >
                <div className="container header-logo-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="logo">
                                <Link href="/">
                                    <img src={`/${current?.setting?.image_logo}`} alt={current?.setting?.brand_name} className="site-logo" />
                                </Link>
                            </div>
                            <div className="cm-rk-768x90">
                               <Ads_Block_Banner current={current}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-bar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="menu">
                                    <div className="menu-hamburger-btn" onClick={ToggleNavMenu}>
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ci" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                            <g fill="none">
                                                <path d="M21 18H3v-2h18v2zm0-5H3v-2h18v2zm0-5H3V6h18v2z" fill="currentColor"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <ul className={`nav-bar-menu ${navMenuCssClass}`} ref={ref}>
                                        <div className="close-nav-bar-menu-header">
                                            <div className="logo d-lg-none">
                                                <Link href="/">
                                                    <img src={`https://${current.setting?.domain_name}/${current?.setting?.image_logo}`} alt={current?.setting?.brand_name} className="site-logo" />
                                                </Link>
                                            </div>
                                            <div className="close-nav-bar-menu d-lg-none" onClick={ToggleNavMenu}>
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <li className="active menu-home-btn">
                                            <Link href="/" className="home">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                    <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="currentColor"></path>
                                                </svg>
                                                <em className="d-lg-none ms-2">{current?.lable_info?.info_home}</em>
                                            </Link>
                                        </li>
                                        {current?.Menu && current?.Menu.sort().map((item: any) => {
                                            if (item.child.length > 0) {
                                                return (
                                                    <li className={`${ClassChild(item.Path, item?.child?.length)}`} key={item.key_type}/*  ref={ref} */>
                                                        <a onClick={() => ToggleChildActive(item.Path)}>
                                                            {LableMenuName(item.key_type, current)}
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                                    <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42z" fill="currentColor"></path>
                                                                </svg>
                                                            </span>
                                                        </a>
                                                        {item.child && <ul className="sub-nav-bar-menu">
                                                            {item.child.sort().map((item_child: any) => {
                                                                return (
                                                                    <li key={item_child.key_type}>
                                                                        <a href={`${UrlByKeyType(item_child.key_type, current)}`}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="iconify iconify--mdi" width="24" height="24" preserveAspectRatio="xMidYMid meet"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" fill="currentColor" /></svg>
                                                                            {LableMenuName(item_child.key_type, current)}
                                                                        </a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>}
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li className={`${ClassChild(item.Path, item?.child?.length)}`} key={item.key_type}>
                                                        <a href={`${UrlByKeyType(item.key_type, current)}`} > {LableMenuName(item.key_type, current)}</a>
                                                    </li>
                                                )
                                            }

                                        })}
                                    </ul>
                                    <ul className="nav-bar-items">
                                        <li className="search-btn d-lg-none" title="Search">
                                            <a onClick={() => ToggleSearch()} className="home">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                        </li>


                                        <li title="Application">
                                            <a href="#" className="home">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32" className="iconify iconify--ic"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM127 384.5c-5.5 9.6-17.8 12.8-27.3 7.3-9.6-5.5-12.8-17.8-7.3-27.3l14.3-24.7c16.1-4.9 29.3-1.1 39.6 11.4L127 384.5zm138.9-53.9H84c-11 0-20-9-20-20s9-20 20-20h51l65.4-113.2-20.5-35.4c-5.5-9.6-2.2-21.8 7.3-27.3 9.6-5.5 21.8-2.2 27.3 7.3l8.9 15.4 8.9-15.4c5.5-9.6 17.8-12.8 27.3-7.3 9.6 5.5 12.8 17.8 7.3 27.3l-85.8 148.6h62.1c20.2 0 31.5 23.7 22.7 40zm98.1 0h-29l19.6 33.9c5.5 9.6 2.2 21.8-7.3 27.3-9.6 5.5-21.8 2.2-27.3-7.3-32.9-56.9-57.5-99.7-74-128.1-16.7-29-4.8-58 7.1-67.8 13.1 22.7 32.7 56.7 58.9 102h52c11 0 20 9 20 20 0 11.1-9 20-20 20z" fill="currentColor" /></svg>
                                            </a>
                                        </li>

                                        <li title="Login or Register">
                                            <Link href="/login" className="home">
                                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" fill="currentColor"></path>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*  <div ref={refsearch}> */}
            <QuickSearch classShow={classShow} current={current} />
            {/*</div> */}
            <Analytics current={current}/>
            {/* Popup in domain */}
            <Ads_Block_PopUp current={current}/>
            {/* Sticky */}
            <Ads_AdsPubfuture_Sticky current={current}/>
        </>
    )
}