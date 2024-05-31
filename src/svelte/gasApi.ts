interface Group {
  group: string;
  childGroups: Group[];
}

export const GoogleAppsScript = {
  getActiveUserEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((result: string) => resolve(result))
        .withFailureHandler((error: any) => reject(error))
        .getActiveUserEmail();
    });
  },

  lookupAccount(
    name: string
  ): Promise<GoogleAppsScript.AdminDirectory.Schema.User> {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler(
          (result: GoogleAppsScript.AdminDirectory.Schema.User) =>
            resolve(result)
        )
        .withFailureHandler((error: any) => reject(error))
        .lookupAccount(name);
    });
  },

  getGroups(userEmail: string): Promise<Group[]> {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((result: Group[]) => resolve(result))
        .withFailureHandler((error: any) => reject(error))
        .getGroups(userEmail);
    });
  },

  getSharedDrives(
    params: any
  ): Promise<{ items: any[]; nextPageToken: string }> {
    return new Promise((resolve, reject) => {
      google.script.run
        .withSuccessHandler((result: { items: any[]; nextPageToken: string }) =>
          resolve(result)
        )
        .withFailureHandler((error: any) => reject(error))
        .getSharedDrives(params);
    });
  },
};
