export default defineAppConfig({
  usingComponents: {},
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/member/index',
    'pages/scan/index',
    'pages/sign/index',
    'pages/forget/index',
  ],
  subpackages: [
    {
      "root": "packagea",
      "pages": [
        "pages/dog/index",
        "pages/car-detail/index",
        "pages/bind-car/index",
        "pages/places/index",
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
    navigationBarBackgroundColor: '#fc690a',
    navigationBarTitleText: '福乐多',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    custom: true,
    color: '#777777',
    selectedColor: '#fc690a',
    backgroundColor: '#fc690a',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './assets/image/car.png',
        selectedIconPath: './assets/image/car-select.png',
        text: '设备'
      },
      {
        pagePath: 'pages/member/index',
        iconPath: './assets/image/user.png',
        selectedIconPath: './assets/image/user-select.png',
        text: '我的'
      }
    ]
  }
})
