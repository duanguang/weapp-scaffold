module.exports = {
  env: {
    NODE_ENV: '"development"',
    environment:JSON.stringify(process.env.environment||'test')
  },
  defineConstants: {
  },
  weapp: {},
  h5: {}
}
