import { VerifyInfo } from './verify'

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
export interface VerfiyAccountInfo {
  phone: VerifyInfo;
  mail: VerifyInfo;
  code: VerifyInfo;
  passwd: VerifyInfo;
  rePwd: VerifyInfo;
}
export interface VerfiyForgetPwdData {
  mail: VerifyInfo;
  code: VerifyInfo;
  passwd: VerifyInfo;
  rePwd: VerifyInfo;
}

type VerfifyType = 0 | 1

export type SignPropType = 'phone' | 'code' | 'mail' | 'passwd' | 'rePwd'
export type ForgetPwdPropType = 'code' | 'mail' | 'passwd' | 'rePwd'

export interface VerifyMailData {
  mail: string,
  pwd: string,
  type: VerfifyType
}

export enum VerfifyTypeEnum {
  SIGN = 0,
  PASSWORD
}

export interface ForgetPwdData{
  mail: string;
  code: string;
  passwd: string;
  rePwd: string;
}