/* Export all functions you'll want to call with 
google.script.run here -- this will allow our type
definition magic to work, so in your svelte side code
you get clean autocomplete for google.script.run */

export { getOUs, getDepartments, getOrganizations, getTitles } from "./config";
export { createUser, updateUser } from "./userManagement";

export { getEmailConfig } from "./config";

export {
  addReaderToCalendars,
  addWriterToCalendars,
} from "./calendarManagement";

export { isAuthorized } from "./config";

export { addToGroups, removeFromGroups } from "./groupManagement";

export { getConfigSheetUrl, getCalendarList, getGroupList } from "./config";

export { lookupAccount } from "./lookupAccount";
export { getGroups } from "./getGroups";

export function getActiveUserEmail() {
  const user = Session.getActiveUser();
  return user.getEmail();
}

export { sendEmail } from "./emailer";
