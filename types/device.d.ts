export interface DeviceData {
  records: DeviceRecord[];
  total: number;
  size: number;
  current: number;
  orders: any[];
  optimizeCountSql: boolean;
  searchCount: boolean;
  maxLimit?: any;
  countId?: any;
  pages: number;
}

export interface DeviceRecord{
  /** 设备编码 */
  deviceCode: string;
  /**状态0-空闲1-运行2-离线 3-下线 */
  status: number;
  /** 状态描述 */
  statusDesc: string;
  /**设备类型0-摇摇车 */
  deviceType: number;
  /**设备图片 */
  deviceImg: string;
  /** 设备描述 */
  remark: string;
  /**绑定状态0-未绑定 1-绑定 */
  bindStatus: number;

  bindStatusDesc: string;
  /**设备昵称 */
  nickname: string;
  /**绑定人编码 */
  bindUser: string;
  /**绑定时间 */
  bindTime: string;
  /**场地编码 */
  addressCode: string;
  /**设备排序 */
  bindSort: number;
  /**商户编码 */
  merchantCode: string;
  /*设备头像*/
  headImg: string;
  tags: string;
  /** 绑定人名称 */
  bindUserName: string;
  /** 场地名称 */
  addressName: string;
}


export interface DeviceBindData {
  /** 设备编码 */
  deviceCode: string;
  bindCode?: any;
  /**设备状态 0-空闲1-下线 2-运作中 3-离线 */
  status: number;
  /** 0-摇摇车 */
  deviceType: number;
  /** 图片地址 */
  deviceImg?: string;
  remark?: string;
  /** 绑定状态0-未绑定 1-已绑定，取值为0 时，deviceBind字段无值 */
  bindStatus: number;
  /** 设备名称 ，未绑定时为空 */
  nickname: string;
  /** 绑定信息 */
  deviceBind: DeviceBind;
}

interface DeviceBind {
  addressCode: string;
  bindSort: number;
  /** 设备名称 ，未绑定时为空 */
  nickname: string;
  /** 商户编号 */
  merchantCode: string;
  headImg?: string;
  remark?: string;
  tags?: string;
  /** 绑定用户信息 */
  bindUser: BindUser;
  /** 地址信息 */
  address: Address;
}

interface Address {
  status: number;
  remark?: any;
  createTime: string;
  addressCode: string;
  addressName: string;
  parentCode: string;
  /** 上级地址详情 */
  parentArea: ParentArea;
}

interface ParentArea {
  status: number;
  remark?: any;
  createTime: string;
  addressCode: string;
  addressName: string;
  parentCode: string;
  parentArea?: any;
}

interface BindUser {
  userCode: string;
  userNick: string;
  phone: string;
}