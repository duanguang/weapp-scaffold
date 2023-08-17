import CustomTabBar from "@/custom-tab-bar";
import Taro, { getCurrentInstance, useDidShow } from "@tarojs/taro";
import { useMemo } from "react";

export function customTabBar(pageIndex: number) {
    const pageCtx = useMemo(() => Taro.getCurrentInstance().page, [])
    // const pageCtx = Taro.getCurrentInstance().page
    
    useDidShow(() => {
        const tabbar = Taro.getTabBar<CustomTabBar>(pageCtx)
        if (tabbar) {
            tabbar?.setSelected(pageIndex)
        }
    })
}