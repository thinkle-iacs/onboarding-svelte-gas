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
  const url =
    "https://docs.google.com/spreadsheets/d/1_BZVWBemmXg1eWo-3yhvXm1Dgyn5fq1QFqUqiX9c2O8/edit#gid=2033833256";
  return url;
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

export function addReaderToCalendars(
  email: string,
  calendarIds: string[]
): { email: string; calendarId: string; success: boolean }[] {
  return calendarIds.map((c) => ({ email, calendarId: c, success: true }));
}

export function addWriterToCalendars(
  email: string,
  calendarIds: string[]
): { email: string; calendarId: string; success: boolean }[] {
  return calendarIds.map((c) => ({ email, calendarId: c, success: true }));
}

export function getEmailConfig(): import("/Users/thinkle/Projects/onboarding-svelte-gas/src/types").EmailSection[] {
  return [
    {
      header: "Body",
      html: "<p>Welcome to IACS!</p>",
      default: true,
    },
    {
      header: "Groups",
      html: "<p>You have been added a to a number of google groups, which will get you some group emails and also get you access to shared google drives where we organize much of our work. You should be able to find these in Google Drive.</p>",
      default: true,
    },
    {
      header: "Calendars",
      html: "<p>You should see some calendar invites in your inbox. Please accept these invitations -- you'll find you'll need access to these calendars soon!</p>",
      default: true,
    },
    {
      header: "Computer Survey",
      html: '<p>We allocate new computers to all new teachers, and do our best to accommodate teacher preferences for Mac, Windows or Chromebooks. Please go ahead and complete our <a href="https://docs.google.com/a/innovationcharter.org/forms/d/1JyPxloytyQbBbTgQdTNIx8A1i2WAiFJTrvIrUchqz1k/viewform">New Staff Computer Survey</a> to let us know your preferences.</p>',
      default: false,
    },
    {
      header: "Footer",
      html: '<p>If you have any questions on things technological, please feel free to reach out to me (<a href="mailto:thinkle@innovationcharter.org">Tom Hinkle</a>). Our general tech support email is <a href="mailto:support@innovationcharter.org">support@innovationcharter.org</a> and will also include our IT Manager and all-around tech wizard Nick Troy. You can also start to get to know our tech environment by browsing our support webpage at <a href="https://support.innovationcharter.org">support.innovationcharter.org</a></p>',
      default: true,
    },
    {
      header: "Signature",
      html: "<p>Tom Hinkle<br>Director of Technology<br>Innovation Academy Charter School</p>",
      default: true,
    },
    {
      header: "Subject",
      html: "Welcome to IACS",
      default: true,
    },
  ];
}
export function sendEmail() {
  return {
    name: "what",
    big: "object",
    lots: "of stuff",
  };
}

export function getOUs(): string[] {
  return ["/Staff/Teachers", "/Staff/"];
}

export function getOrganizations(): string[] {
  return ["HS", "MS", "Whole School"];
}

export function getTitles(): string[] {
  return ["Teacher", "Admin", "Nurse"]; // TODO: Replace with mock return value of type string[]
}

export function createUser(user: any): void {
  user.id = "a0w9834alksdjfasdf" + Math.random() * 100;
  return user;
}

export function updateUser(user: any): void {
  return user;
}

export function getDepartments(): string[] {
  return ["Science", "ELA", "Student Services", "Health", "Athletics"];
}
