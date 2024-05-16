export function HeaderList({ name,totalRecode,current,modeView,setModeView}:any){
   const activelist = modeView == 'cm-list' ? 'active' : '';
   const activegrid = modeView == "cm-grid" ? 'active' :'';
    return (<>
    <div className="section-header mb-2">
    <div className="section-header-icon">
        <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M12 2l-5.5 9h11z" fill="currentColor"></path>
            <circle cx="17.5" cy="17.5" r="4.5" fill="currentColor"></circle>
            <path d="M3 13.5h8v8H3z" fill="currentColor"></path>
        </svg>
    </div>
    <div className="section-header-title me-auto">
        <h2 className="max-caracter-2">{name}</h2>
        <span>Found: {totalRecode} item</span>
    </div>
    <div className="section-header-title-right">

        <div className="appearance me-lg-3">
            <div className={`appearance-view list-view ${activelist}`}>
                <a onClick={()=>setModeView('cm-list')}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path d="M3 4h4v4H3V4m6 1v2h12V5H9m-6 5h4v4H3v-4m6 1v2h12v-2H9m-6 5h4v4H3v-4m6 1v2h12v-2H9" fill="currentColor"></path>
                    </svg>
                </a>
            </div>
            <div className={`appearance-view grid-view ${activegrid}`}>
                <a onClick={()=>setModeView('cm-grid')}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" fillRule="evenodd" fill="currentColor"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
    </>);
}