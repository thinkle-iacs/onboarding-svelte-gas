/* A module for logging information */

import { getActiveUserEmail } from "./api";
import { getConfigSheetUrl } from "./config";

export function logInfo(
  action: string,
  result: any,
  affectedUser: string = "",
  detail: string = ""
) {
  let user = getActiveUserEmail();
  let configSheetUrl = getConfigSheetUrl();
  let logSheet;
  try {
    logSheet = SpreadsheetApp.openByUrl(configSheetUrl).getSheetByName("Log");
  } catch (err) {
    console.error("Error opening log sheet");
    console.error(err);
    throw err;
  }
  let now = new Date();
  let resultString = result;
  if (typeof result !== "string") {
    resultString = JSON.stringify(result);
  }
  logSheet.appendRow([now, user, action, affectedUser, detail, resultString]);
}
