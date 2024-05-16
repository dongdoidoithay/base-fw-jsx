export function getDate(date:any, config:any) {
  let result = "";
  try {
    var _exp = Date.parse(date);
    let ts = new Date(Date.now() - _exp);
    let differentYear = Math.ceil(
      (Date.now() - _exp) / (1000 * 60 * 60 * 24 * 30 * 12)
    );
    let differentMonth = Math.ceil(
      (Date.now() - _exp) / (1000 * 60 * 60 * 24 * 30)
    );
    let differentDays = Math.ceil((Date.now() - _exp) / (1000 * 60 * 60 * 24));
    let differentHour = Math.ceil((Date.now() - _exp) / (1000 * 60 * 60));
    let differentMinute = Math.ceil((Date.now() - _exp) / (1000 * 60));
    if (differentDays <= 1) {
      if (differentMinute < 60) {
        if (differentMinute < 2) {
          return config.configSetting.lbl_date_now;
        } else {
          result = `${differentMinute} ${config.configSetting.lbl_date_minutes}`;
        }
      } else {
        if (differentHour === 1)
          result = `1  ${config.configSetting.lbl_date_hour}`;
        else result = `${differentHour} ${config.configSetting.lbl_date_hour}s`;
      }
    } else if (differentDays - 1 == 0) {
      result = `${config.configSetting.lbl_date_yesterday}`;
    } else {
      if (differentDays > 30) {
        if (differentMonth > 12) {
          result = `${differentYear} ${config.configSetting.lbl_date_years}`;
        } else {
          result = `${differentMonth} ${config.configSetting.lbl_date_months}`;
        }
      } else {
        result = `${differentDays} ${config.configSetting.lbl_date_days}`;
      }
    }
    return result;
  } catch (e) {
    return result;
  }
}
export function FomatDate(date:any, current:any) {
  let result = "";
  if (date == null) return result;
  try {
    //DateTime parsedDate = DateTime.Parse(date);
    var _exp = Date.parse(date);
    let ts = new Date(Date.now() - _exp);
    let differentYears = Math.ceil(
      (Date.now() - _exp) / (1000 * 60 * 60 * 24 * 30 * 12)
    );
    let differentMonths = Math.ceil(
      (Date.now() - _exp) / (1000 * 60 * 60 * 24 * 30)
    );
    let differentDays = Math.ceil((Date.now() - _exp) / (1000 * 60 * 60 * 24));
    let differentHours = Math.ceil((Date.now() - _exp) / (1000 * 60 * 60));
    let differentMinutes = Math.ceil((Date.now() - _exp) / (1000 * 60));
    if (differentDays <= 1) {
      if (differentMinutes < 60) {
        if (differentMinutes < 2) {
          return `${current.date_select.lbl_date_minutes}`;
        } else {
          result = `${differentMinutes} ${current.date_select.lbl_date_minutes}`;
        }
      } else {
        if (differentHours == 1) {
          result = `$1 ${current.date_select.lbl_date_hour}`;
        } else {
          result = `${differentHours} ${current.date_select.lbl_date_hour}s`;
        }
      }
    } else if (differentDays == 1) {
      result = `${current.date_select.lbl_date_yesterday}`;
    } else {
      if (differentDays > 30) {
        if (differentMonths > 12) {
          result = `${differentYears} ${current.date_select.lbl_date_years}`;
        } else {
          result = `${differentMonths} ${current.date_select.lbl_date_months}`;
        }
      } else {
        result = `${differentDays} ${current.date_select.lbl_date_days}`;
      }
    }

    return result;
  } catch (e) {
    return result;
  }
}
export function FomatDateCutual(date:any, current:any) {
  let result = "";
  if (current == null) return result;
  if (date == null) return result;
  try {
    let formatter = new Intl.DateTimeFormat("en");
    switch (current.type_select.key_lang) {
      case "br":
        formatter = new Intl.DateTimeFormat("pt-BR");
        break;
      case "ru":
        formatter = new Intl.DateTimeFormat("ru");
        break;
      case "italy":
        formatter = new Intl.DateTimeFormat("it");
        break;
      case "indo":
        formatter = new Intl.DateTimeFormat("id");
        break;
      default:
        formatter = new Intl.DateTimeFormat("en");
        break;
    }
    result = formatter.format(date);
    return result;
  } catch (e) {
    return result;
  }
}
