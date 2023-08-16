import Taro from '@tarojs/taro'
import { Component } from 'react'
import { CoverView, CoverImage } from '@tarojs/components'
import './index.css'
import '../app.css'

export default class CustomTabBar extends Component{
  state = {
    selected: 0,
    color: '#777777',
    selectedColor: '#fc690a',
    backgroundColor: '#fc690a',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '设备',
        selectedIconPath: '../assets/image/car-select.png',
        iconPath: '../assets/image/car.png',
      },
      {
        iconPath: '../assets/image/scan.png',
      },
      {
        pagePath: 'pages/cars/index',
        text: '我的',
        selectedIconPath: '../assets/image/user-select.png',
        iconPath: '../assets/image/user.png',
      }
    ]
  }

  switchTab = (item) => {
      const url = '/' + item.pagePath
      Taro.switchTab({
          url: url
      })
  }

  scanCode = () => {
    console.log('sm')
    // 跳转到目的页面，打开新页面
    Taro.scanCode({
      fail: (err) => {
        console.log(err)
      },
      success: (res) => {
        console.log(res.path)
        Taro.navigateTo({
          url: `/${res.path}`,
        })
      }
    })
  }

  tabItem = (item, index) => {
    return <CoverView className='bottom-tab-item' onClick={this.switchTab.bind(this, item)} data-path={item.pagePath} key={item.text}>
                    <CoverImage className='bottom-tab-item-img' src={this.state.selected === index ? item.selectedIconPath : item.iconPath} />
                    <CoverView className='bottom-tab-item-text' style={{ color: this.state.selected === index ? this.state.selectedColor : this.state.color }}>
                        {item.text}
                    </CoverView>
                </CoverView>
  }
  componentWillMount() { }

  componentDidMount() {
    console.log('222')
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }


  render() {


    return (
      <CoverView className='bottom-tab-wrap'>
        <CoverView className='bottom-tab'>
          {
              this.tabItem(this.state.list[0], 0)
          }
          {
            (
              <CoverView className='bottom-tab-item pr'>

              </CoverView>
            )
          }
          {
              this.tabItem(this.state.list[2], 2)
          }
        </CoverView>
        <CoverView
          className="scan-wrap m-flex justify-center items-center"
          onClick={this.scanCode.bind(this)}
        >
          <CoverView className='scan-wrap-box m-flex justify-center items-center'>
              <CoverImage className='scan-img' src='../assets/image/car-scan.png' />
          </CoverView>
        </CoverView>
    </CoverView>
    )
  }
}
