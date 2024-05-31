/* 
Note to future self:
THE GoogleAppsScript API does not actually support
anything like this functionality. We've tried hard including much harder
methods than the below such as listing *all* drives and then listing permissions
and going through that, but the permissions API doesn't seem to return any of the 
documented fields such as emailAddress that would be helpful for that, so this
functionality will have to be put on ice for now.

*/

/* export function getSharedDrives(params) {
  const { groupEmail, pageToken } = params;
  const sharedDrives = [];
  console.log("Fetching drives for ", groupEmail, pageToken);
  if (!groupEmail) {
    console.log("No email", groupEmail);
    return {
      items: sharedDrives,
      nextPageToken: null,
    };
  }

  const response = Drive.Drives.list({
    query: `memberEmail = '${groupEmail}'`,
    pageToken: pageToken,
    useDomainAdminAccess: true,
    pageSize: 100, // Adjust page size as needed
  });

  const drivesList = response.drives;
  if (drivesList && drivesList.length > 0) {
    for (const drive of drivesList) {
      sharedDrives.push({ name: drive.name, id: drive.id });
    }
  }

  console.log("Fetched", drivesList.length, "drives for", groupEmail);
  console.log(drivesList);
  return {
    items: sharedDrives,
    nextPageToken: response.nextPageToken || null,
  };
}
 */
