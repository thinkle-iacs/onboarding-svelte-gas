import { isAuthorized } from "./config";
import { logInfo } from "./logging";

export function sendEmail(
  email: string,
  subject: string,
  body: string,
  cc: string
) {
  if (isAuthorized()) {
    let result;
    if (cc) {
      result = GmailApp.sendEmail(email, subject, "", { cc, htmlBody: body });
    } else {
      result = GmailApp.sendEmail(email, subject, "", { htmlBody: body });
    }
    logInfo("Send Email", result, email, body);
    return result || "Success";
  }
}
