import {action, observable } from 'mobx';
import { StoreMeta } from 'types/core.store';
import { StoreModules,Store } from './core.store';
import {Place} from '@/constants/const.type'
@StoreModules
export default class UserStore extends Store{
    static meta:StoreMeta={
        ...Store.meta,
    }
    @observable places:Array<Place>=[]
    @action setPlaces(places:Array<Place>) {
        this.places = places;
    }
}
