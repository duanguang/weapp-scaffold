export interface UserData {
  userCode: string;
  userNick: string;
  phone: string;
  wechatId?: any;
  registFrom: number;
  registTime: string;
  status: number;
  money: number;
  giveMoney: string;
  userRole: UserRole;
}

interface UserRole {
  roleCode: string;
  roleName: string;
}

export interface AccountInfo {
  phone: string;
  mail: string;
  code: string;
  passwd: string;
  rePwd: string;
}

type VerfifyType = 0 | 1

export type SignPropType = 'phone' | 'code' | 'mail' | 'passwd' | 'rePwd'

export interface VerifyMailData {
  mail: string,
  pwd: string,
  type: VerfifyType
}
