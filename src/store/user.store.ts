import {action, observable } from 'mobx';
import { StoreMeta } from 'types/core.store';
import { StoreModules,Store } from './core.store';
@StoreModules
export default class UserStore extends Store{
    static meta:StoreMeta={
        ...Store.meta,
    }
    @observable name='xiaoming'
    @action setName(name:string) {
        this.name = name;
    }
}
