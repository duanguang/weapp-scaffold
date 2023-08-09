import { Component,PropsWithChildren } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import { Provider,setInjector } from './store/core.store'
let storeManage = setInjector(null,{})
class App extends Component<PropsWithChildren> {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    //  是将要会渲染的页面
    //@ts-ignore
    return <Provider store={storeManage}>
      {this.props.children}
    </Provider>
    // return this.props.children
  }
}

export default App
