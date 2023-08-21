import CustomTabBar from "@/custom-tab-bar";
import Taro, { getCurrentInstance, useDidShow, useLoad } from "@tarojs/taro";
import { useMemo } from "react";
import { Store, observer } from '@/store/core.store';
import UserStore from '@/store/user.store'
import { ROUTERS } from '@/routers';

export function customTabBar(pageIndex: number) {
    const pageCtx = useMemo(() => Taro.getCurrentInstance().page, [])
    // const pageCtx = Taro.getCurrentInstance().page
    useLoad(() => {
      const store = Store.getStore(UserStore);
      console.log(store.loadSwitchPages)
      if (!store.loadSwitchPages) {
        store.setLoadSwitchPages(1)
        Taro.switchTab({
          url: ROUTERS.user
        })
      } else if (store.loadSwitchPages==1){
        Taro.switchTab({
          url: ROUTERS.home
        })
      }
    })
    useDidShow(() => {
        const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx)
        if (tabbar) {
            tabbar?.setSelected(pageIndex)
        }
    })
}
