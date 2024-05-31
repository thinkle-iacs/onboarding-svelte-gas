export function getGroups(userEmail) {
  const directGroups = [];
  const visitedGroups = new Set();

  function listGroups(email) {
    let groups = [];
    let pageToken;
    do {
      const response = AdminDirectory.Groups.list({
        userKey: email,
        pageToken: pageToken,
      });
      const groupsList = response.groups;
      if (groupsList && groupsList.length > 0) {
        for (const group of groupsList) {
          if (!visitedGroups.has(group.email)) {
            visitedGroups.add(group.email);
            const childGroups = listGroups(group.email);
            groups.push({
              group: group.email,
              childGroups: childGroups,
            });
          }
        }
      }
      pageToken = response.nextPageToken;
    } while (pageToken);
    return groups;
  }

  // Start with direct groups
  const initialGroups = listGroups(userEmail);
  for (const group of initialGroups) {
    directGroups.push(group);
  }

  return directGroups;
}
