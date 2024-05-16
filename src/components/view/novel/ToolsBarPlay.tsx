export function ToolsBarPlay({ playInLine, pause, resume, cancel }: any) {

    return (<>
        <div className="col-md-12 mt-2 mb-2 notranslate">
            <div className="gray-bg-color border-radius-4 p-2">
                <div className="chapter-player-buttons">
                    <button className="play" id="start" onClick={playInLine}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M8 5.14v14l11-7l-11-7z" fill="currentColor"></path>
                        </svg>
                    </button>
                    <button className="pause" id="pause" onClick={pause}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M14 19h4V5h-4M6 19h4V5H6v14z" fill="currentColor"></path>
                        </svg>
                    </button>
                    <button className="resume" id="resume" onClick={resume}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--ci" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <g fill="none">
                                <path d="M6 4h2v2.557a7 7 0 1 1-1.037 10.011l1.62-1.184A5 5 0 1 0 9.408 8H12v2H6V4z" fill="currentColor"></path>
                            </g>
                        </svg>
                    </button>
                    <button className="stop" id="cancel" onClick={cancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path d="M18 18H6V6h12v12z" fill="currentColor"></path>
                        </svg>
                    </button>

                    <div className="cm-dropdown w-auto">
                        <select onChange={() => { }}  >
                            {/* <option value="@(default(string))">(unset)</option>
                    @foreach (var voice in Voices.OrderBy(v => v.Lang).ThenBy(v => v.VoiceURI))
                    {
                        <option @key="voice.VoiceIdentity" value="@voice.VoiceIdentity" selected="@(voice.VoiceIdentity == this.VoiceId)">@voice.Name (@voice.Lang)</option>
                    } */}
                        </select>
                    </div>
                </div>

            </div>
        </div>
    </>);
}