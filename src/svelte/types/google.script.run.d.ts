
declare namespace google.script {  
  interface GoogleScriptRun {
      withFailureHandler(callback: (error: Error, object?: any) => void): this;
      withSuccessHandler(callback: (value: any, object?: any) => void): this;
      withUserObject(object: Object): this;
      getActiveUserEmail(): void;
  getOUs(): void;
  getDepartments(): void;
  getOrganizations(): void;
  getTitles(): void;
  createUser(user: any): void;
  updateUser(user: any): void;
  getEmailConfig(): void;
  addReaderToCalendars(email: string, calendarIds: string[]): void;
  addWriterToCalendars(email: string, calendarIds: string[]): void;
  isAuthorized(): void;
  addToGroups(userEmail: string, groupEmails: string[]): void;
  removeFromGroups(userEmail: string, groupEmails: string[]): void;
  getConfigSheetUrl(): void;
  getCalendarList(): void;
  getGroupList(): void;
  lookupAccount(name: string): void;
  getGroups(userEmail: any): void;
  sendEmail(email: string, subject: string, body: string, cc: string): void
  }
  const run : GoogleScriptRun;

  interface GoogleScriptHost {
  close(): void;
  setHeight(height: number): void;
  setWidth(width: number): void;
  editor: {
    focus(): void;
  };
}
const host : GoogleScriptHost;
  

  interface IUrlLocation {
  hash: string;
  parameter: { [key: string]: any };
  parameters: { [key: string]: any[] };
}

interface GoogleScriptUrl {
  getLocation(callback: (location: IUrlLocation) => void): void;
}
const url : GoogleScriptUrl;
  
}
