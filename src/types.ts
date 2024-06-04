import { StaffCategory, GroupKind } from "./types";

export type GroupInfo = {
  email: string;
  category: StaffCategory;
  kind: GroupKind;
};
export type StaffCategory = "HS" | "MS" | "All" | "Athletics";

export type GroupKind =
  | "Department"
  | "Advisory"
  | "Building"
  | "School"
  | "Other";
export type CalendarInfo = {
  name: string;
  id: string;
  category: StaffCategory;
  kind: GroupKind;
};

export type GroupChangeResult = {
  userEmail: string;
  groupEmail: string;
  success: boolean;
  error?: string;
  change: "add" | "remove";
};
