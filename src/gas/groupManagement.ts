import type { GroupChangeResult } from "../types";
import { isAuthorized } from "./config";
import { logInfo } from "./logging";

export function addToGroups(
  userEmail: string,
  groupEmails: string[]
): GroupChangeResult[] {
  if (!isAuthorized()) {
    return [
      {
        userEmail,
        groupEmail: groupEmails[0],
        success: false,
        error: "Not authorized",
        change: "add",
      },
    ];
  }
  let results = groupEmails.map((groupEmail) => {
    try {
      let result = AdminDirectory.Members.insert(
        {
          email: userEmail,
          role: "MEMBER",
        },
        groupEmail
      );
      logInfo(
        "Add to Groups",
        "SUCCESS" + JSON.stringify(result),
        userEmail,
        groupEmails.join(", ")
      );

      return {
        userEmail,
        groupEmail,
        success: true,
        change: "add",
      } as GroupChangeResult;
    } catch (err) {
      logInfo(
        "Add to Groups",
        "ERROR: " + JSON.stringify(err),
        userEmail,
        groupEmails.join(", ")
      );
      return {
        userEmail,
        groupEmail,
        success: false,
        error: err.message,
        change: "add",
      } as GroupChangeResult;
    }
  });

  return results;
}

export function removeFromGroups(
  userEmail: string,
  groupEmails: string[]
): GroupChangeResult[] {
  if (!isAuthorized()) {
    return [
      {
        userEmail,
        groupEmail: groupEmails[0],
        success: false,
        error: "Not authorized",
        change: "remove",
      },
    ];
  }
  let results = groupEmails.map((groupEmail) => {
    try {
      AdminDirectory.Members.remove(groupEmail, userEmail);
      return {
        userEmail,
        groupEmail,
        success: true,
        change: "remove",
      } as GroupChangeResult;
    } catch (err) {
      return {
        userEmail,
        groupEmail,
        success: false,
        error: err.message,
        change: "remove",
      } as GroupChangeResult;
    }
  });
  return results;
}
