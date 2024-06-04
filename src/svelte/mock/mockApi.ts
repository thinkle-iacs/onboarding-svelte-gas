export function getActiveUserEmail(): string {
  return "thinkle@example.com";
}

function makeFirstName(letter: string): string {
  switch (letter.toLowerCase()) {
    case "a":
      return "Alice";
    case "b":
      return "Bob";
    case "c":
      return "Charlie";
    case "d":
      return "Diana";
    case "e":
      return "Edward";
    case "f":
      return "Fiona";
    case "g":
      return "George";
    case "h":
      return "Hannah";
    case "i":
      return "Isaac";
    case "j":
      return "Julia";
    case "k":
      return "Kevin";
    case "l":
      return "Liam";
    case "m":
      return "Megan";
    case "n":
      return "Nathan";
    case "o":
      return "Olivia";
    case "p":
      return "Paul";
    case "q":
      return "Quincy";
    case "r":
      return "Rachel";
    case "s":
      return "Sarah";
    case "t":
      return "Tom";
    case "u":
      return "Uma";
    case "v":
      return "Victor";
    case "w":
      return "Wendy";
    case "x":
      return "Xander";
    case "y":
      return "Yvonne";
    case "z":
      return "Zach";
    default:
      return "Jonathan";
  }
}

export function lookupAccount(
  name: string
): GoogleAppsScript.AdminDirectory.Schema.User {
  if (name.length < 3) throw new Error("Name too short");
  let first = makeFirstName(name[0]);
  let last = name[1].toLocaleUpperCase() + name.substring(2);

  return {
    orgUnitPath: "/Staff/Tech",
    ipWhitelisted: false,
    creationTime: "2008-03-18T19:27:43.000Z",
    gender: { type: "male" },
    isMailboxSetup: true,
    emails: [{ address: name + "@innovationcharter.org", primary: true }],
    archived: false,
    thumbnailPhotoUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVqjwr4zSWu4y_u9FCb9bsUn0UFYaq4Jn5UCEBFr7RaBM1pPjmh=s96-c",
    changePasswordAtNextLogin: false,
    customerId: "C03wq9yev",
    id: "113561106451202000689",
    recoveryEmail: name + "@gmail.com",
    agreedToTerms: true,
    primaryEmail: name + "@innovationcharter.org",
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
      fullName: first + " " + last,
      givenName: first,
      familyName: last,
    },
    etag: '"1H1-aJh8nkaxx0DjOXqyf3OKql_TWhfx_bDfxancDeQ/fiaOEWfGOAd5C366cAOwh4ES1uk"',
    thumbnailPhotoEtag:
      '"1H1-aJh8nkaxx0DjOXqyf3OKql_TWhfx_bDfxancDeQ/2gTLcvY94hTPkz6Plxsm-M2qfC0"',
  };
}

export function getGroups(userEmail: string) {
  return [
    {
      group: "hs-ela@innovationcharter.org",
      childGroups: [
        {
          group: "ela@innovationcharter.org",
        },
        {
          group: "hs-faculty@innovationcharter.org",
        },
      ],
    },
    {
      group: "grade-9-advisors@innovationcharter.org",
      childGroups: [
        {
          group: "hs-advisors@innovationcharter.org",
          childGroups: [
            {
              group: "advisors@innovationcharter.org",
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

import type {
  GroupInfo,
  GroupKind,
  CalendarInfo,
  StaffCategory,
  GroupChangeResult,
} from "../../types";

export function getGroupList(): GroupInfo[] {
  return [
    {
      email: "hs@innovationcharter.org",
      category: "HS",
      kind: "School",
    },
    ...[
      "ela",
      "math",
      "science",
      "social-studies",
      "student-services",
      "wellness",
    ].flatMap((department) => [
      {
        email: `hs-${department}@innovationcharter.org`,
        category: "HS" as StaffCategory,
        kind: "Department" as GroupKind,
      },
      {
        email: `ms-${department}@innovationcharter.org`,
        category: "MS" as StaffCategory,
        kind: "Department" as GroupKind,
      },
    ]),
    ...[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => ({
      email: `grade-${grade}-advisors@innovationcharter.org`,
      category: grade < 9 ? "MS" : ("HS" as StaffCategory),
      kind: "Advisory" as GroupKind,
    })),
  ];
}

export function getCalendarList(): CalendarInfo[] {
  return [
    {
      name: "School Calendar",
      id: "asdlfkajwer",
      kind: "School",
      category: "All",
    },
    {
      name: "HS Staff Calendar",
      id: "owieurwaeklraesr",
      kind: "School",
      category: "HS",
    },
  ];
}

export function getConfigSheetUrl(): string {
  return "hello";
}

export function addToGroups(
  userEmail: string,
  groupEmails: string[]
): GroupChangeResult[] {
  return groupEmails.map((groupEmail) => {
    return {
      userEmail,
      groupEmail,
      success: true,
      change: "add",
    };
  });
}

export function removeFromGroups(
  userEmail: string,
  groupEmails: string[]
): GroupChangeResult[] {
  return groupEmails.map((groupEmail) => {
    return {
      userEmail,
      groupEmail,
      success: true,
      change: "remove",
    };
  });
}

export function isAuthorized(): boolean {
  return true;
}
