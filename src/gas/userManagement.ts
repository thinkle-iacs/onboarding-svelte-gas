export function createUser(user) {
  let userAsCreated = AdminDirectory.Users.insert(user);
  return userAsCreated;
}

export function updateUser(user) {
  let updated = AdminDirectory.Users.update(user, user.primaryEmail);
  return updated;
}
