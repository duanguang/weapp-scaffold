import { ROUTERS } from "@/routers";
import { Store } from "@/store/core.store";
import UserStore from "@/store/user.store";
import Taro, {  useDidShow } from "@tarojs/taro";

export function authenticate() {
  
    const store = Store.getStore(UserStore)  
    useDidShow(() => {
        if (!store.isLogin) {
            Taro.navigateTo({
                url: ROUTERS.login,
            })
        }
    })
}