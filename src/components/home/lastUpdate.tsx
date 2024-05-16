import { FomatDate } from "@/utils/caldate";
import { UrlInfo, TitleShow, TypeDoc, UrlDetail } from "@/utils/commons";
import LazyImage from "@/components/ui/ImageLazy";
import Loadding from "@/components/ui/Loadding";
import { RightComponents } from "@/components/share/RightComopents";

export function LastUpdate({ data, current }: any) {
  //const router = useRouter();
  const _renderChapterItem = (lsData: any, type: any) => {
    //console.log(type);
    if (!lsData) return <></>

    if (type == "Anime") {
      return lsData.map((data: any) => (
        <div className="card-box-chapter" key={data.idDetail}>
          <div className="card-box-chapter-name max-caracter-1">
            <a
              href={`${UrlInfo(data.idDoc, current)}?ep=${data.idDetail}`}
              title={`${TitleShow(
                data.nameDoc,
                TypeDoc.View,
                current,
                data.nameChapter,
                data.nameDoc
              )}`}
            >
              {data.nameChapter}
            </a>
          </div>
          <div className="card-box-chapter-time">
            {FomatDate(data.date, current)}
          </div>

          <div className="mobile-chr-number">
            <a
              href={`${UrlInfo(data.idDoc, current)}?ep=${data.idDetail}`}
              title={`${TitleShow(
                data.nameDoc,
                TypeDoc.View,
                current,
                data.nameChapter,
                data.nameDoc
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="24"
                height="24"
              >
                <path
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      ));
    }
    return lsData.map((data: any) => (
      <div className="card-box-chapter" key={data.idDetail}>
        <div className="card-box-chapter-name max-caracter-1">
          <a
            href={`${UrlDetail(data.idDoc, data.idDetail, current)}`}
            title={`${TitleShow(
              data.nameDoc,
              TypeDoc.View,
              current,
              data.nameChapter,
              data.nameDoc
            )}`}
          >
            {data.nameChapter}
          </a>
        </div>
        <div className="card-box-chapter-time">
          {FomatDate(data.date, current)}
        </div>

        <div className="mobile-chr-number">
          <a
            href={`${UrlDetail(data.idDoc, data.idDetail, current)}`}
            title={`${TitleShow(
              data.nameDoc,
              TypeDoc.View,
              current,
              data.nameChapter,
              data.nameDoc
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              width="24"
              height="24"
            >
              <path
                d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    ));
  };
  return (
    <>
      <section className="mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-header">
                    <div className="section-header-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        /*  xmlns:xlink="http://www.w3.org/1999/xlink" */
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--mdi"
                        width="32"
                        height="32"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M7 10h5v5H7m12 4H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="section-header-title me-auto">
                      <h2 className="max-caracter-2">
                        {current.lable_info.lable_home_last_update}{" "}
                        {current.uri_select.name_type}
                      </h2>
                      <span className="max-caracter-1">
                        Read latest updated manga,watch latest updated anime,
                        Korean manhwa and Chinese manhua online for free!
                      </span>
                    </div>
                    <a
                      href={`/${current.uri_select.key_uri}/last-update`}
                      className="section-header-button"
                    >
                      {current.lable_info.lable_action_view_more}
                    </a>
                  </div>
                </div>
                {!data && <Loadding />}
                {data.map((item: any) => {
                  let hotChrAft = "";
                  if (item.view > 1000) hotChrAft = "hotChrAft";
                  return (
                      <div className="col-12 col-lg-6 mb-4" key={item.idDoc}>
                        <div className="card-box">
                          <div className="card-box-left">
                            <div className="card-box-image">
                              <a
                                href={`${UrlInfo(item.idDoc, current)}`}
                                title={`${TitleShow(
                                  item.name,
                                  TypeDoc.Info,
                                  current,
                                  "1",
                                  item.nameOther,
                                  "",
                                  item.authName,
                                  item.desc,
                                  item.nameOther
                                )}`}
                              >
                                <LazyImage src={item.image} srcSet={item.image} title={item.name} />
                              </a>
                            </div>
                          </div>
                          <div className="card-box-right">
                            <div
                              className="card-box-name max-caracter-1"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="@item.name"
                            >
                              <a
                                href={`${UrlInfo(item.idDoc, current)}`}
                                title={`${TitleShow(
                                  item.nameDoc,
                                  TypeDoc.Info,
                                  current,
                                  "1",
                                  item.nameOther,
                                  "",
                                  item.authName,
                                  item.desc,
                                  item.nameOther
                                )}`}
                                className={hotChrAft}
                              >
                                {item.name}
                              </a>
                            </div>
                            <div className="card-box-chapters">
                              {_renderChapterItem(item.lsDetail,item.type)}
                            </div>
                          </div>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-5 col-lg-4 col-xl-3">
              {/*  <Slidebar/> */}
              <RightComponents dataToview={data} current={current}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
