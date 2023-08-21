import { action,computed,observable } from 'mobx';
import { StoreMeta } from 'types/core.store';
import { StoreModules,Store } from './core.store';
import { UserData } from 'types/user';
import { userApi } from '@/api';
import { USER_ACCESS_TOKEN, USER_REFRESH_ACCESS_TOKEN } from '@/constants/storage.config';
import Taro from '@tarojs/taro';
@StoreModules
export default class UserStore extends Store {
    static meta: StoreMeta = {
        ...Store.meta,
    }
    @observable user: UserData = {
        userCode: '',
        userNick: '',
        phone: '',
        registFrom: 0,
        registTime: '',
        status: 0,
        money: 0,
        giveMoney: '',
        userRole: {
            roleCode: '',
            roleName: '',
        }
    }
    @observable token = ''
    @observable freshToken = ''
    @observable loadSwitchPages = 0

    @computed get isLogin() {
        const _token = Taro.getStorageSync(USER_ACCESS_TOKEN) as string
        if (_token) {
            return true;
        }
        return false;
    }
    @action setLoadSwitchPages(num:number) {
      this.loadSwitchPages = num
    }
    @action setToken(token: string) {
        this.token = token;
    }
    @action setFreshToken(token: string) {
        this.freshToken = token;
    }
    @action async setUser() {
        const res =await userApi.get();
        if (res?.data?.userCode) {
            this.user = res?.data;
        }
    }
    @action async loginout() {
        Taro.removeStorageSync(USER_ACCESS_TOKEN);
        Taro.removeStorageSync(USER_REFRESH_ACCESS_TOKEN);
        this.token = '';
        this.freshToken = '';
        this.loadSwitchPages = 0
    }
}
