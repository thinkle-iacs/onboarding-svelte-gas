export function getActiveUserEmail(): string {
  return "thinkle@example.com";
}

export function lookupAccount(
  name: string
): GoogleAppsScript.AdminDirectory.Schema.User {
  return {
    orgUnitPath: "/Staff/Tech",
    ipWhitelisted: false,
    creationTime: "2008-03-18T19:27:43.000Z",
    gender: { type: "male" },
    isMailboxSetup: true,
    emails: [{ address: "thinkle@innovationcharter.org", primary: true }],
    archived: false,
    thumbnailPhotoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVqjwr4zSWu4y_u9FCb9bsUn0UFYaq4Jn5UCEBFr7RaBM1pPjmh=s96-c",
    changePasswordAtNextLogin: false,
    customerId: "C03wq9yev",
    id: "113561106451202000689",
    recoveryEmail: "tmhinkle@gmail.com",
    agreedToTerms: true,
    primaryEmail: "thinkle@innovationcharter.org",
    includeInGlobalAddressList: true,
    languages: [{ languageCode: "en", preference: "preferred" }],
    isEnrolledIn2Sv: true,
    kind: "admin#directory#user",
    recoveryPhone: "+19782016485",
    isAdmin: true,
    suspended: false,
    lastLoginTime: "2024-05-29T16:24:08.000Z",
    isDelegatedAdmin: false,
    isEnforcedIn2Sv: false,
    name: {
      fullName: "Thomas Hinkle",
      givenName: "Thomas",
      familyName: "Hinkle",
    },
    etag: '"1H1-aJh8nkaxx0DjOXqyf3OKql_TWhfx_bDfxancDeQ/fiaOEWfGOAd5C366cAOwh4ES1uk"',
    thumbnailPhotoEtag:
      '"1H1-aJh8nkaxx0DjOXqyf3OKql_TWhfx_bDfxancDeQ/2gTLcvY94hTPkz6Plxsm-M2qfC0"',
  };
}

export function getGroups(userEmail: string) {
  return [
    {
      group: "directGroup1@domain.com",
      childGroups: [
        {
          group: "inheritedGroup1-1@domain.com",
          childGroups: [
            {
              group: "childGroup1-1-1@domain.com",
              childGroups: [],
            },
            {
              group: "childGroup1-1-2@domain.com",
              childGroups: [],
            },
          ],
        },
        {
          group: "inheritedGroup1-2@domain.com",
          childGroups: [
            {
              group: "childGroup1-2-1@domain.com",
              childGroups: [],
            },
          ],
        },
      ],
    },
    {
      group: "directGroup2@domain.com",
      childGroups: [
        {
          group: "inheritedGroup2-1@domain.com",
          childGroups: [
            {
              group: "childGroup2-1-1@domain.com",
              childGroups: [],
            },
          ],
        },
      ],
    },
    {
      group: "directGroup3@domain.com",
      childGroups: [
        {
          group: "inheritedGroup3-1@domain.com",
          childGroups: [],
        },
      ],
    },
  ];
}

export function getSharedDrives(params: any): {
  items: any[];
  nextPageToken: string | null;
} {
  if (!params.email) {
  }
  if (params.pageToken === "nextPageTokenString") {
    return {
      items: [
        {
          id: "driveId3",
          name: `Shared Drive 3 for for ${params.email}`,
          colorRgb: "#0000FF",
          backgroundImageFile: {
            id: "imageFileId3",
            xCoordinate: 0.3,
            yCoordinate: 0.3,
            width: 0.4,
          },
        },
      ],
      nextPageToken: null, // No more pages
    };
  } else {
    return {
      items: [
        {
          id: "driveId1",
          name: `Shared Drive 1 for ${params.email}`,
          colorRgb: "#FF0000",
          backgroundImageFile: {
            id: "imageFileId1",
            xCoordinate: 0.1,
            yCoordinate: 0.1,
            width: 0.8,
          },
        },
        {
          id: "driveId2",
          name: `Shared Drive 2 for ${params.email}`,
          colorRgb: "#00FF00",
          backgroundImageFile: {
            id: "imageFileId2",
            xCoordinate: 0.2,
            yCoordinate: 0.2,
            width: 0.6,
          },
        },
      ],
      nextPageToken: "nextPageTokenString",
    };
  }
}
