export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
  ],
  subpackages: [
    {
      "root": "packagea",
      "pages": [
        "pages/dog/index"
      ]
    }, {
      "root": "packageb",
      "name": "pack2",
      "pages": [
        "pages/banana/index"
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
