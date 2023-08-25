import {action, observable } from 'mobx';
import { StoreMeta } from 'types/core.store';
import { StoreModules,Store } from './core.store';
import {Place} from '@/constants/const.type'
import { DeviceData, DeviceDetail } from 'types/device';
import { deviceApi } from '@/api';
@StoreModules
export default class DeviceStore extends Store{
    static meta:StoreMeta={
        ...Store.meta,
    }
    @observable deviceList: DeviceData['records']=[];
    @observable detail: DeviceDetail.Device={} as DeviceDetail.Device;
    @observable places:Array<Place>=[]
    @action setPlaces(places:Array<Place>) {
        this.places = places;
    }
    @action setDeviceList(list: DeviceData['records']) {
        this.deviceList = list;
    }
    @action async getDetail(code:string) {
        const res = await deviceApi.get(code);
        //@ts-ignore
        this.detail = deviceApi.dataProcessing(res.data);
        console.log(res.data)
    }
}
