import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Taro, { Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './app.less';
import { store } from './store';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

import 'taro-ui/dist/style/index.scss';
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}> {this.props.children} </Provider>;
  }
}

export default App;
