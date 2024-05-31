interface DriveCapabilities {
  canAddChildren: boolean;
  canComment: boolean;
  canCopy: boolean;
  canDeleteDrive: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canListChildren: boolean;
  canManageMembers: boolean;
  canReadRevisions: boolean;
  canRename: boolean;
  canRenameDrive: boolean;
  canChangeDriveBackground: boolean;
  canShare: boolean;
  canChangeCopyRequiresWriterPermissionRestriction: boolean;
  canChangeDomainUsersOnlyRestriction: boolean;
  canChangeDriveMembersOnlyRestriction: boolean;
  canChangeSharingFoldersRequiresOrganizerPermissionRestriction: boolean;
  canResetDriveRestrictions: boolean;
  canDeleteChildren: boolean;
  canTrashChildren: boolean;
}

interface BackgroundImageFile {
  id: string;
  xCoordinate: number;
  yCoordinate: number;
  width: number;
}

interface DriveRestrictions {
  copyRequiresWriterPermission: boolean;
  domainUsersOnly: boolean;
  driveMembersOnly: boolean;
  adminManagedRestrictions: boolean;
  sharingFoldersRequiresOrganizerPermission: boolean;
}

export interface Drive {
  id: string;
  name: string;
  colorRgb: string;
  kind: string;
  backgroundImageLink: string;
  capabilities: DriveCapabilities;
  themeId: string;
  backgroundImageFile: BackgroundImageFile;
  createdTime: string;
  hidden: boolean;
  restrictions: DriveRestrictions;
  orgUnitId: string;
}
