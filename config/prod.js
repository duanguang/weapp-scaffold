module.exports = {
  env: {
    NODE_ENV: '"production"',
    environment:JSON.stringify(process.env.environment||'prod')
  },
  defineConstants: {
  },
  weapp: {},
  h5: {}
}
