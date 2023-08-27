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

export interface DeviceRecord {
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
export namespace DeviceDetail {
  // 设备信息接口
  interface Device {
    deviceCode: string; // 设备编码
     /**设备状态 0-空闲 1-运行 2-下线3-离线 */ 
    status: number;
     /** 状态描述 */
    statusDesc: string;
    deviceType: number; // 0-摇摇车
    deviceImg: string; // 图片地址
    remark: string; // 备注
    /** 绑定状态 0-未绑定 1-已绑定，取值为0时，deviceBind字段无值 */
    bindStatus: number; // 
    nickname: string; // 设备名称，未绑定时为空
    deviceBind?: DeviceBind; // 绑定信息，可选
    runInfo: RunInfo;
  }

  // 绑定信息接口
  interface DeviceBind {
    deviceCode: string; // 设备编码
    bindSort: number; // 设备状态 
    nickname: string; // 设备名称，未绑定时为空
    merchantCode: string; // 商户编号
    headImg: string; // 图片地址
    remark: string; // 备注
    bindUser: BindUser; // 绑定用户信息
    address: Address; // 地址信息
  }

  // 地址信息接口
  interface Address {
    remark: string; // 备注
    status: number; // 地址状态 0-正常
    createTime: string; // 创建时间
    addressCode: string; // 地址编码
    addressName: string; // 地址名称
    parentCode: string; // 上级地址code
    parentArea: Address; // 上级地址详情
  }

  // 绑定用户信息接口
  interface BindUser {
    // TODO: 添加绑定用户信息的属性
  }

  // 运行信息接口
  interface RunInfo {
    deviceCode: string; // 设备编码
    status: number; // 状态 0-运行中 1-已停止
    startTime: string; // 开始时间
    endTime: string;
    updateTime: string; // 最后更新时间
    ruleTime: number; // 计划内运行时长 单位：毫秒（ms）
    realTime: number; // 实际运行时长 单位：毫秒（ms）
  }
}


