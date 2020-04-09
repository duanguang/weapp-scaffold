import Taro, {
    Component
  } from "@tarojs/taro";
  import { autorun } from 'mobx';
  import  invariant from "invariant"
  export function Page(options) {
    return function (Components) {
      class Page extends Components {
        constructor() {
          super();       
        }
        componentWillMount(){
            super.componentWillMount&&super.componentWillMount();
        }
        onLoading(){
            const {loading,store,auth} = options
            let storeScope = this.props[store]
            if(storeScope&&loading){
                let loadState = storeScope[loading]
                if(loadState&&loadState.state==='pending'){
                        Taro.showToast({
                            title:'正在加载中...',
                            icon:'loading',
                            duration:10000
                        })
                }else{
                    Taro.hideToast() 
                }
            }
        }
        checkAuth(){
            const {store,auth} = options
            let storeScope = this.props[store]
            if(storeScope&&auth){
                let state = storeScope[auth.state]
                let value = state?state.value:{}
                
                if(value&&value.code===403){
                    Taro.showModal({
                        title:'提示',
                        content:'您还未登录,请先登录',
                        showCancel:false,
                        cancelText:'登录',
                        success:function(){
                            if(auth.redirect){
                                Taro.redirectTo({
                                    url:auth.redirect
                                })
                                state.clear&&state.clear()
                            }
                        }
                    })
                }
                
            }
        }
        componentDidMount() {
            super.componentDidMount&&super.componentDidMount();
            if(options){
                invariant(typeof options==='object', 'options: options should is a object');
                const {store,auth} = options
                let storeScope = this.props[store]
                if(storeScope){
                    autorun(()=>{                        
                        this.onLoading()
                        this.checkAuth()
                    })
                    
                }
                
            }
        }
      }
      return Page
    }
  }
  
  export function CheckAuth(options){
      return (target,key,descriptor)=>{
         const oldValue=descriptor.value;
         console.log(target,descriptor) 
         descriptor.value=function(){
            return oldValue.apply(this, arguments);
        }
        return descriptor;
      }
  }

  
  