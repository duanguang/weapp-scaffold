import {action, observable } from 'mobx';
import { StoreMeta } from 'types/core.store';
import { StoreModules,Store } from './core.store';
import {Place} from '@/constants/const.type'
import { DeviceData, DeviceRecord } from 'types/device';
@StoreModules
export default class DeviceStore extends Store{
    static meta:StoreMeta={
        ...Store.meta,
    }
    @observable deviceList: DeviceData['records']=[];
    @observable places:Array<Place>=[]
    @action setPlaces(places:Array<Place>) {
        this.places = places;
    }
    @action setDeviceList(list: DeviceData['records']) {
        this.deviceList = list;
    }
}
