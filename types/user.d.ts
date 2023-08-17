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