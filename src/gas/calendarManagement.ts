import { logInfo } from "./logging";

export function addReaderToCalendars(email: string, calendarIds: string[]) {
  return addUserToCalendars(email, calendarIds, "reader");
}

export function addWriterToCalendars(email: string, calendarIds: string[]) {
  return addUserToCalendars(email, calendarIds, "writer");
}

export function addUserToCalendars(email: string, calendarIds: string[], role) {
  let results = calendarIds.map((calendarId) => {
    if (addUserToCalendar(email, calendarId, role)) {
      return { email: email, calendarId: calendarId, success: true };
    } else {
      return { email: email, calendarId: calendarId, success: false };
    }
  });
  let failures = results.filter((r) => !r.success);
  let successes = results.filter((r) => r.success);
  if (failures.length > 0) {
    console.error("Error adding user to calendars: " + failures);
    logInfo(
      "Add to Calendars",
      "ERROR: " + JSON.stringify(failures),
      email,
      calendarIds.join(", ")
    );
  }
  if (successes.length > 0) {
    logInfo(
      "Add to Calendars",
      "SUCCESS: " + JSON.stringify(successes),
      email,
      calendarIds.join(", ")
    );
  }
  return results;
}

function addUserToCalendar(user, calendarId, role) {
  if (!role) {
    role = "reader";
  }
  var calendarId = calendarId;
  var acl = {
    scope: {
      type: "user",
      value: user,
    },
    role: role,
  };
  try {
    Calendar.Acl.insert(acl, calendarId);
  } catch (err) {
    console.error("Error adding calendar: " + err);
    //throw err;
    return false;
  }
  return true;
}
