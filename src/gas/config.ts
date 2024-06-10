import { CalendarInfo } from "../types";
import { StaffCategory, GroupKind } from "../types";
import { GroupInfo } from "../types";

const CONFIG_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1_BZVWBemmXg1eWo-3yhvXm1Dgyn5fq1QFqUqiX9c2O8/edit#gid=2033833256";

export function getConfigSheetUrl() {
  return CONFIG_SHEET_URL;
}

export function isAuthorized(): boolean {
  let sheet = SpreadsheetApp.openByUrl(CONFIG_SHEET_URL).getSheetByName("Auth");
  let data = sheet
    .getRange("A:A")
    .getValues()
    .map((r) => r[0])
    .filter((v) => v);
  let activeUser = Session.getActiveUser().getEmail();
  if (data.includes(activeUser)) {
    return true;
  } else {
    return false;
  }
}

export function getGroupList(): GroupInfo[] {
  let sheet =
    SpreadsheetApp.openByUrl(CONFIG_SHEET_URL).getSheetByName("Groups");
  let data = sheet.getDataRange().getValues();
  let groups: GroupInfo[] = [];
  let headers = data[0];
  let emailIndex = headers.indexOf("email");
  let categoryIndex = headers.indexOf("category");
  let kindIndex = headers.indexOf("kind");
  if (emailIndex === -1 || categoryIndex === -1 || kindIndex === -1) {
    throw new Error(
      `Missing required columns in Groups sheet at ${CONFIG_SHEET_URL}`
    );
  }
  for (let i = 1; i < data.length; i++) {
    let email = data[i][emailIndex];
    let category = data[i][categoryIndex] as StaffCategory;
    let kind = data[i][kindIndex] as GroupKind;
    groups.push({ email, category, kind });
  }
  return groups;
}

export function getCalendarList(): CalendarInfo[] {
  let sheet =
    SpreadsheetApp.openByUrl(CONFIG_SHEET_URL).getSheetByName("Calendars");
  let data = sheet.getDataRange().getValues();
  let calendars: CalendarInfo[] = [];
  let headers = data[0];
  let nameIndex = headers.indexOf("name");
  let idIndex = headers.indexOf("id");
  let categoryIndex = headers.indexOf("category");
  let kindIndex = headers.indexOf("kind");
  if (
    nameIndex === -1 ||
    idIndex === -1 ||
    categoryIndex === -1 ||
    kindIndex === -1
  ) {
    throw new Error(
      `Missing required columns in Calendars sheet at ${CONFIG_SHEET_URL}`
    );
  }
  for (let i = 1; i < data.length; i++) {
    let name = data[i][nameIndex];
    let id = data[i][idIndex];
    let category = data[i][categoryIndex] as StaffCategory;
    let kind = data[i][kindIndex] as GroupKind;
    calendars.push({ name, id, category, kind });
  }
  return calendars;
}
import type { EmailSection } from "../types";
export function getEmailConfig(): EmailSection[] {
  let sheet =
    SpreadsheetApp.openByUrl(CONFIG_SHEET_URL).getSheetByName("Email");
  let data = sheet.getDataRange().getValues();
  let sections: EmailSection[] = [];
  for (let row = 1; row < data.length; row++) {
    let header = data[row][0];
    let html = data[row][1];
    let isDefault = data[row][2];
    sections.push({ header, html, default: isDefault });
  }
  return sections;
}
