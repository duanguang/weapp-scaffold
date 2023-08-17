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