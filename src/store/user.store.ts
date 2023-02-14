import {action, observable } from 'mobx';
import Store from 'brain-store';
import { StoreModules } from 'brain-store';
import { StaticMeta as StoreMeta } from 'brain-store/types/api/meta';

@StoreModules
export default class UserInfoStore extends Store{
    static meta:StoreMeta={
        ...Store.meta,
        // className:'UserInfoStore'
    }
    @observable name='xiaoming'
    @action setName(name:string) {
        this.name = name;
    }
}
