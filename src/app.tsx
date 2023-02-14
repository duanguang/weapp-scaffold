import { Component,PropsWithChildren } from 'react'
import './app.less'
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
