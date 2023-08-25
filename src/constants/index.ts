export const VerifyPassword = '202308216234'
export const VerifyTips = {
  NO_PHONE: '请输入手机号',
  ERR_FMT_PHONE: '手机格式不正确',
  NO_MAIL: '请输入邮箱',
  ERR_FMT_MAIL: '邮箱格式不正确',
  NO_PWD: '请输入密码',
  NO_REPWD: '请输入确认密码',
  ERR_FMT_PWD: '密码为6-30位字符',
  DIFF_PWD: '两次密码不一致',
  NO_VERIFY_CODE: '请输入邮箱验证码',
}

export const phoneReg = /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/g
export const mailReg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g
