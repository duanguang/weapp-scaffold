import Taro from '@tarojs/taro'
import { Component } from 'react'
import { CoverView, CoverImage } from '@tarojs/components'
import './index.css'

export default class CustomTabBar extends Component{
  state = {
    selected: 0,
    color: '#777777',
    selectedColor: '#fc690a',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '设备',
        selectedIconPath: '../assets/image/car-select.png',
        iconPath: '../assets/images/car.png',
      },
      {
        pagePath: 'pages/index/index',
        text: '我的',
        selectedIconPath: '../assets/image/user-select.png',
        iconPath: '../assets/images/user.png',
      }
    ]
  }

  switchTab = (item) => {
      const url = '/' + item.pagePath
      Taro.switchTab({
          url: url
      })
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
      <CoverView className='bottom-tab'>
        {
            this.state.list.map((item, index) => {
                return <CoverView className='bottom-tab-item' onClick={this.switchTab.bind(this, item)} data-path={item.pagePath} key={item.text}>
                    <CoverImage className='bottom-tab-item-img' src={this.state.selected === index ? item.selectedIconPath : item.iconPath} />
                    <CoverView className='bottom-tab-item-text' style={{ color: this.state.selected === index ? this.state.selectedColor : this.state.color }}>
                        {item.text}
                    </CoverView>
                </CoverView>
            })
        }
    </CoverView>
    )
  }
}
