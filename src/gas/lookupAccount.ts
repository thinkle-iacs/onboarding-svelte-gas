export function lookupAccount(name: string) {
  if (!name.includes("@")) {
    name = name + "@innovationcharter.org";
  }
  const user = AdminDirectory.Users.get(name);
  return user;
}
