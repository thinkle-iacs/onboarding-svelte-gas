
export const GoogleAppsScript = {
  
     getActiveUserEmail(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getActiveUserEmail();
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

     addToGroups(userEmail: string, groupEmails: string[]): Promise<GroupChangeResult[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: GroupChangeResult[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .addToGroups(userEmail, groupEmails);
      });
    },

     removeFromGroups(userEmail: string, groupEmails: string[]): Promise<GroupChangeResult[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: GroupChangeResult[]) => resolve(result))
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
    }
}
