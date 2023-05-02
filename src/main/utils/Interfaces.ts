interface PermissionObject {
  token: string;
  droplet_action: { power_on: boolean; power_off: boolean; reboot: boolean };
}

// eslint-disable-next-line import/prefer-default-export
export { PermissionObject };
