
export const GoogleAppsScript = {
  
     getActiveUserEmail(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getActiveUserEmail();
      });
    },

     getOUs(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getOUs();
      });
    },

     getDepartments(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getDepartments();
      });
    },

     getOrganizations(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getOrganizations();
      });
    },

     getTitles(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getTitles();
      });
    },

     createUser(user: any): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .createUser(user);
      });
    },

     updateUser(user: any): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .updateUser(user);
      });
    },

     getEmailConfig(): Promise<import("../types").EmailSection[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../types").EmailSection[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getEmailConfig();
      });
    },

     addReaderToCalendars(email: string, calendarIds: string[]): Promise<{ email: string; calendarId: string; success: boolean; }[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: { email: string; calendarId: string; success: boolean; }[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .addReaderToCalendars(email, calendarIds);
      });
    },

     addWriterToCalendars(email: string, calendarIds: string[]): Promise<{ email: string; calendarId: string; success: boolean; }[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: { email: string; calendarId: string; success: boolean; }[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .addWriterToCalendars(email, calendarIds);
      });
    },

     isAuthorized(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: boolean) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .isAuthorized();
      });
    },

     addToGroups(userEmail: string, groupEmails: string[]): Promise<import("../types").GroupChangeResult[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../types").GroupChangeResult[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .addToGroups(userEmail, groupEmails);
      });
    },

     removeFromGroups(userEmail: string, groupEmails: string[]): Promise<import("../types").GroupChangeResult[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../types").GroupChangeResult[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .removeFromGroups(userEmail, groupEmails);
      });
    },

     getConfigSheetUrl(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getConfigSheetUrl();
      });
    },

     getCalendarList(): Promise<import("../types").CalendarInfo[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../types").CalendarInfo[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getCalendarList();
      });
    },

     getGroupList(): Promise<import("../types").GroupInfo[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: import("../types").GroupInfo[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getGroupList();
      });
    },

     lookupAccount(name: string): Promise<GoogleAppsScript.AdminDirectory.Schema.User> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: GoogleAppsScript.AdminDirectory.Schema.User) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .lookupAccount(name);
      });
    },

     getGroups(userEmail: any): Promise<any[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getGroups(userEmail);
      });
    },

     sendEmail(email: string, subject: string, body: string, cc: string): Promise<any> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .sendEmail(email, subject, body, cc);
      });
    }
}
