export type DeviceType = 0 | 1

export interface Device {
  nickname: string,
  siteAreaCode: string,
  deviceCode: string,
  deviceType: DeviceType,
  bindSort: number
}

export type Place = {
  addressCode: string,
  addressName: string,
}
