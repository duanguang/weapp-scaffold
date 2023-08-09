export default defineAppConfig({
  usingComponents: {},
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/cars/index',
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
    navigationBarBackgroundColor: '#fc690a',
    navigationBarTitleText: '福美乐',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    custom: true,
    color: '#777777',
    selectedColor: '#fc690a',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './assets/image/car.png',
        selectedIconPath: './assets/image/car-select.png',
        text: '设备'
      },
      {
        pagePath: 'pages/cars/index',
        iconPath: './assets/image/user.png',
        selectedIconPath: './assets/image/user-select.png',
        text: '我的'
      }
    ]
  }
})
