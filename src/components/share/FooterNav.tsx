import { LableMenuName, UrlByKeyType } from "@/utils/commons"
import Link from "next/link"

export function FooterNav({ current }: any) {
    function ScrollTop() {
        window && window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <div className="back-to-top" onClick={() => ScrollTop()}>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path d="M7.03 9.97h4v8.92l2.01.03V9.97h3.99l-5-5z" fill="currentColor"></path>
                </svg>
            </div>
            <footer className="mt-5 notranslate">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-3 text-center text-sm-start">
                            <div className="logo mb-3"><Link href="/"><img src={`https://${current.setting?.domain_name}/${current?.setting?.image_logo}`} alt="" className="site-logo" /></Link></div>
                            <p className="max-caracter-4">
                                Read manga online free.Read latest updated japanese manga, chinese manhua, korean manhwa.Read latest releases, latest chapters and new manga.
                            </p>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 mt-3 text-center text-sm-start">
                            <h2>Menu</h2>
                            <ul>
                               {/*  <li key={`k-01`}>
                                    <Link href="/">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="iconify iconify--mdi" width="12" height="12"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                        {current?.lable_info?.info_home}
                                    </Link>
                                </li> */}
                                {current.Menu.map((item: any) => {
                                    if (item?.child.length > 0) {
                                        return item.child.map((item_child: any) => {
                                            return (
                                                <li key={item_child.key_type}>
                                                    <a href={UrlByKeyType(item_child.key_type, current)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="iconify iconify--mdi" width="12" height="12"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                                        {LableMenuName(item_child.key_type, current)}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    } else {
                                        return (
                                            <li key={item.key_type}>
                                                <a href={UrlByKeyType(item.key_type, current)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="iconify iconify--mdi" width="12" height="12"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                                    {LableMenuName(item.key_type, current)}
                                                </a>
                                            </li>
                                        )
                                    }
                                })}

                             {/*    <li>
                                    <Link href="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="iconify iconify--mdi" width="12" height="12"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="iconify iconify--mdi" width="12" height="12"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" fill="currentColor" /></svg>
                                        Register
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 mt-3 text-center text-sm-start">
                            <h2>Popular Links</h2>
                            {/*   <ul>
                    <li><a href="Tales-of-Demons-and-Gods-2.html">Tales of Demons and Gods</a></li>
                    <li><a href="solo-leveling-3.html">Solo Leveling</a></li>
                    <li><a href="martial-peak.html">Martial Peak</a></li>
                    <li><a href="apotheosis-elevation-to-the-status-of-a-god.html">Apotheosis - Elevation to the status of a god</a></li>
                    <li><a href="versatile-mage.html">Versatile Mage</a></li>
                    <li><a href="rebirth-of-the-urban-immortal-cultivator.html">Rebirth of the Urban Immortal Cultivator</a></li>
                </ul>  */}
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 mt-3 text-center text-sm-start">
                            <h2>Helpfull Links</h2>
                            {/* <ul>
                    <li><a href="dmca.html">DMCA</a></li>
                    <li><a href="terms-of-service.html">TERMS OF SERVICE</a></li>
                    <li><a href="privacy-policy.html">PRIVACY &amp; POLICY</a></li>
                    <li><a href="contact.html">CONTACT</a></li>
                </ul>  */}
                        </div>
                        <div className="col-md-12 text-center text-sm-start">
                            <div className="footer-content">
                                <div className="footer-left">© {new Date().getFullYear()} {current.setting.brand_name}</div>
                                <div className="footer-right"> </div>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}